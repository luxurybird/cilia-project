/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import fs from 'fs';
import path from 'path';
import { generate } from '@graphql-codegen/cli';
import { Project, PropertySignature, SourceFile, SyntaxKind } from 'ts-morph';
import { ESLint } from 'eslint';
import minimist, { Opts, ParsedArgs } from 'minimist';

const TIME_LABEL = 'codegen';
const SPECIAL_WORDS: string[] = [];
const CODEGEN_ARGS_OPTS: Opts = {
  boolean: ['production', 'staging', 'verbose'],
  string: ['config'],
};

interface CodegenArgs extends ParsedArgs {
  config: string;
  production: boolean;
  staging: boolean;
  verbose: boolean;
}

type EndpointEnvironment = 'staging' | 'production';

interface Endpoint extends Record<EndpointEnvironment, string> {}

interface Configuration {
  endpoints: Record<string, Endpoint>;
  scalars: Record<string, string>;
}

// FIXME: Why is not AggregateError type definition available?
declare class AggregateError<T extends Error = Error> extends Error {
  readonly name: 'AggregateError';

  readonly errors: readonly [T];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(errors: Iterable<any>, message?: string);
}

class UsageError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UsageError.prototype);
  }
}

interface CodegenTask {
  endpoint: string;
  scalars: Record<string, string>;
  environment: EndpointEnvironment;
  projectPath: string;
  apiUrl: string;
  outputFile: string;
  verbose: boolean;
}

function findSpecialWord(input: string, matchPrefix?: boolean): string | undefined {
  const upperCaseInput = input.toUpperCase();
  if (matchPrefix) {
    return SPECIAL_WORDS.find((x) => upperCaseInput.startsWith(x.toUpperCase()));
  }

  return SPECIAL_WORDS.find((x) => upperCaseInput === x.toUpperCase());
}

function capitalizeFirstChar(input: string) {
  const s = input.replace(/^([_]+)/, ''); // Trim underscores from the start
  const specialWord = findSpecialWord(s, true);
  if (specialWord) {
    return specialWord + s.substr(specialWord.length);
  }

  const firstChar = s.charAt(0);
  const restChars = s.substr(1);
  return firstChar.toUpperCase() + restChars;
}

function changeEnumCase(input: string) {
  return input
    .split(/_(?!\d)/) // Only split if the second part does not start with number
    .map((x) => findSpecialWord(x) ?? capitalizeFirstChar(x.toLowerCase()))
    .join('');
}

function createSectionComment(...lines: string[]) {
  const middle = lines.map((x) => ` * ${x}`).join('\n');
  return `\n/**\n${middle}\n */\n`;
}

function getTypePropertyList(sourceFile: SourceFile, typeName: string) {
  const typeAlias = sourceFile.getTypeAliasOrThrow(typeName);
  const typeLiteral = typeAlias.getTypeNodeOrThrow().asKindOrThrow(SyntaxKind.TypeLiteral);

  const propList: PropertySignature[] = [];

  for (const member of typeLiteral.getMembers()) {
    const prop = member.asKind(SyntaxKind.PropertySignature);
    if (prop) {
      propList.push(prop);
    }
  }

  return propList;
}

function getTypePropertyNameList(sourceFile: SourceFile, typeName: string) {
  return getTypePropertyList(sourceFile, typeName)
    .map((p) => p.getName())
    .filter((p) => p !== '__typename');
}

function getTypeAliasesForOperation(sourceFile: SourceFile, typeName: string) {
  const result: string[] = [];

  for (const propName of getTypePropertyNameList(sourceFile, typeName)) {
    const normalizedPropName = capitalizeFirstChar(propName);
    const typeAlias = `export type ${typeName}${normalizedPropName} = Pick<${typeName}, '${propName}'>;`;
    result.push(typeAlias);
  }

  return result;
}

function createUnionType(typeName: string, literals: string[]) {
  const list = literals.map((x) => `'${x}'`).join(' | ');
  return `export type ${typeName} = ${list};\n`;
}

function createOperationTypeAliases(projectPath: string, outputFile: string) {
  console.log('Creating operation type aliases...');

  const project = new Project({
    tsConfigFilePath: path.join(projectPath, 'tsconfig.json'),
  });
  const sourceFile = project.addSourceFileAtPath(outputFile);

  const queryTypeAliases = getTypeAliasesForOperation(sourceFile, 'Query');
  const mutationTypeAliases = getTypeAliasesForOperation(sourceFile, 'Mutation');

  let outputContent = fs.readFileSync(outputFile, { encoding: 'utf-8' });
  outputContent += createSectionComment('Query type aliases');
  outputContent += `${queryTypeAliases.join('\n')}\n`;
  outputContent += createSectionComment('Mutation type aliases');
  outputContent += `${mutationTypeAliases.join('\n')}\n`;

  const mutationProps = getTypePropertyNameList(sourceFile, 'Mutation');

  const mintMutationProps = mutationProps.filter((p) => /^mint/.test(p));
  if (mintMutationProps.length > 0) {
    outputContent += createSectionComment('Mint mutation names');
    outputContent += createUnionType('MintMutationName', mintMutationProps);
  }

  const closeMutationProps = mutationProps.filter((p) => /^close/.test(p));
  if (closeMutationProps.length > 0) {
    outputContent += createSectionComment('Close mutation names');
    outputContent += createUnionType('CloseMutationName', closeMutationProps);
  }

  fs.writeFileSync(outputFile, outputContent);
}

async function formatGeneratedFile(outputFile: string) {
  console.log('Applying code formatting and cleanup...');

  // The following is equilavent of "yarn eslint --fix outputFile"
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles([outputFile]);
  await ESLint.outputFixes(results);
}

async function executeCodegenTask(task: CodegenTask) {
  const outputFilePath = path.join(task.projectPath, task.outputFile);

  console.log(`
  Endpoint   : ${task.endpoint} (${task.environment})
  API URL    : ${task.apiUrl}
  Output File: ${outputFilePath}
  Generating...
  `);

  try {
    await generate(
      {
        silent: !task.verbose,
        schema: task.apiUrl,
        generates: {
          [task.outputFile]: {
            config: {
              namingConvention: {
                typeNames: capitalizeFirstChar,
                enumValues: changeEnumCase,
              },
              scalars: task.scalars,
            },
            plugins: [
              'typescript',
              'typescript-operations',
              {
                add: {
                  placement: 'prepend',
                  content: ['/* eslint-disable camelcase */\n'],
                },
              },
            ],
          },
        },
      },
      true,
    );

    createOperationTypeAliases(task.projectPath, task.outputFile);

    await formatGeneratedFile(task.outputFile);

    console.log('Done\n');
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.toString() : '(Unspecified)'}`);

    // Throw an error as in the file so that we don't include it by mistake.
    // "export {}" statement is necessary to make the file a module.
    const placeholder = `
        export {};
        throw new Error('"${task.environment}" environment failed to generate for "${task.endpoint}" endpoint.');
      `;
    fs.writeFileSync(outputFilePath, placeholder);

    await formatGeneratedFile(task.outputFile);

    throw err;
  }
}

function loadConfiguration(configPath: string): Configuration | undefined {
  const content = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(content) as Configuration;

  // Validate basic structure
  return config != null && typeof config === 'object' ? config : undefined;
}

function politeErrorMapper(error: Error | AggregateError, target?: string): string {
  let messages = [];

  if (target) {
    messages.push(`  Target: ${target}`);
    if ('errors' in error && Array.isArray(error.errors)) {
      messages = messages.concat(
        error.errors.map((err) => politeErrorMapper(err as Error | AggregateError)),
      );
    }
  } else {
    messages.push(`  Error: ${error?.message}`);
  }

  return messages.join('\n');
}

async function mainAsync(codegenArgs: CodegenArgs): Promise<void> {
  const args: CodegenArgs = { ...codegenArgs };

  if (!args.config) {
    throw new UsageError('Configuration file path is not provided.');
  }

  if (!args.staging && !args.production) {
    args.staging = true;
    args.production = true;
  }

  const config = loadConfiguration(args.config);
  if (!config) {
    throw new UsageError('Configuration is incorrect or inaccessible.');
  }

  const projectPath = path.resolve(__dirname, '..');
  const taskList: CodegenTask[] = [];

  for (const [endpoint, entry] of Object.entries(config.endpoints)) {
    const entryPath = `./src/types/graphql/${endpoint}`;
    const entryAbsolutePath = path.join(projectPath, entryPath);
    if (!fs.existsSync(entryAbsolutePath)) {
      fs.mkdirSync(entryAbsolutePath, { recursive: true });
    }

    const environmentList: EndpointEnvironment[] = [];

    if (entry.staging && args.staging) {
      environmentList.push('staging');
    }

    if (entry.production && args.production) {
      environmentList.push('production');
    }

    for (const environment of environmentList) {
      taskList.push({
        endpoint,
        scalars: config.scalars,
        environment,
        projectPath,
        apiUrl: entry[environment],
        outputFile: `${entryPath}/${environment}.ts`,
        verbose: args.verbose,
      });
    }
  }

  const promises = taskList.map((task) =>
    executeCodegenTask(task).catch((err: Error) => {
      if (!args.verbose) {
        throw new Error(politeErrorMapper(err, `${task.endpoint} (${task.environment})`));
      }
      throw err;
    }),
  );

  const results = await Promise.allSettled(promises);

  const errors: Error[] = (
    results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[]
  ).map((result) => result.reason as Error);

  if (errors.length > 0) {
    throw new AggregateError(errors, 'Completed with errors!');
  }

  console.log('\nCompleted!');
}

console.time(TIME_LABEL);
mainAsync(minimist<CodegenArgs>(process.argv.slice(2), CODEGEN_ARGS_OPTS))
  .catch((err) => {
    console.log('');
    if (err instanceof UsageError) {
      console.error(err);
      console.log('\nUsage: ts-node graphql-codegen.ts --url <GraphQL API URL>\n');
    }
    if (err instanceof AggregateError) {
      console.error((err as Error).message);
      err.errors.forEach((_err, index) => {
        console.log(`\nError ${index + 1}:`);
        console.error(_err);
      });
    }
    process.exit(1);
  })
  .finally(() => {
    console.timeEnd(TIME_LABEL);
  });
