import { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client';
import { FieldNode, Kind, OperationDefinitionNode } from 'graphql';

import { Mutation, Query } from '../types/graphql';

/**
 * Returns the GraphQL operation name (ie. consumer-defined).
 */
function getOperationName<TData = Mutation | Query, TVariables = OperationVariables>(
  mutationOrQuery: DocumentNode | TypedDocumentNode<TData, TVariables>,
): string | undefined {
  const def = mutationOrQuery.definitions.find((x) => x.kind === Kind.OPERATION_DEFINITION) as
    | OperationDefinitionNode
    | undefined;
  return def?.name?.value;
}

export function getOperationNames(operations: (DocumentNode | TypedDocumentNode)[]): string[] {
  return operations.map(getOperationName).filter(Boolean) as string[];
}

/**
 * Returns the name of the GraphQL operation's root field (ie. platform-defined).
 */
export function getOperationFieldName<TData = Mutation | Query, TVariables = OperationVariables>(
  mutationOrQuery: DocumentNode | TypedDocumentNode<TData, TVariables>,
): string | undefined {
  const def = mutationOrQuery.definitions.find((x) => x.kind === Kind.OPERATION_DEFINITION) as
    | OperationDefinitionNode
    | undefined;
  const field = def?.selectionSet.selections.find((x) => x.kind === Kind.FIELD) as
    | FieldNode
    | undefined;
  return field?.name.value;
}
