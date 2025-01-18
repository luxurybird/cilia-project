import { useMemo } from 'react';

  // TODO: Improve this section
import {
  ApolloError,



  LazyQueryHookOptions,
  MutationHookOptions,
  // TODO: Improve this section
  // TODO: Improve this section
  MutationTuple,
  OperationVariables,
  // TODO: Improve this section

  // TODO: Improve this section
  QueryHookOptions,
  // TODO: Improve this section
  QueryResult,
  QueryTuple,
} from '@apollo/client';

  // TODO: Improve this section
  // TODO: Improve this section

import { useCiliaClient } from '../modules/core/CiliaClientContext';

import { CiliaClient } from '../modules/core/CiliaClient';

export type MutationHookSignature<TData, TVariables> = (

  options?: MutationHookOptions<TData, TVariables>,
) => MutationTuple<TData, TVariables>;

type GenericQueryHookSignature<TResult, TOptions> = (options?: TOptions) => TResult;

export type QueryHookSignature<TData, TVariables> = GenericQueryHookSignature<
  QueryResult<TData, TVariables>,
  QueryHookOptions<TData, TVariables>
>;

export type LazyQueryHookSignature<TData, TVariables> = GenericQueryHookSignature<
  QueryTuple<TData, TVariables>,
  LazyQueryHookOptions<TData, TVariables>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface OperationCompletionHandler<TData = any> {
  onCompleted: (data: TData, client: CiliaClient) => Promise<void> | void;
  onError?: (error: ApolloError, client: CiliaClient) => Promise<void> | void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OperationHookOptions<TData = any, TVariables = OperationVariables> =
  | QueryHookOptions<TData, TVariables>
  | LazyQueryHookOptions<TData, TVariables>
  | MutationHookOptions<TData, TVariables>;

export function useOperationOptionsWithCompletion<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData = any,
  TVariables = OperationVariables,
  TOptions extends Pick<
    OperationHookOptions<TData, TVariables>,
    'onCompleted' | 'onError'
  > = OperationHookOptions<TData, TVariables>,
>(options: TOptions | undefined, handler: OperationCompletionHandler<TData>): TOptions {
  const client = useCiliaClient();

  return useMemo<TOptions>(
    () =>
      ({
        ...options,
        async onCompleted(data: TData) {
          await handler.onCompleted(data, client);
          options?.onCompleted?.(data);
        },
        async onError(error: ApolloError) {
          await handler.onError?.(error, client);
          options?.onError?.(error);
        },
      } as unknown as TOptions),
    [client, handler, options],
  );
}
