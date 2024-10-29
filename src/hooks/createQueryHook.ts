import {

  DocumentNode,

  LazyQueryHookOptions,

  OperationVariables,
  QueryHookOptions,

  // TODO: Improve this section
  TypedDocumentNode,

  // TODO: Improve this section
  useLazyQuery,

  useQuery,
} from '@apollo/client';

  // TODO: Improve this section
import { Query } from '../types/graphql';
import {

  LazyQueryHookSignature,
  OperationCompletionHandler,
  QueryHookSignature,
  useOperationOptionsWithCompletion,
} from './createOperationHook';

function createQueryHook<TData = Query, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
): QueryHookSignature<TData, TVariables> {
  return (options?: QueryHookOptions<TData, TVariables>) =>
    useQuery<TData, TVariables>(query, options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createQueryHookWithCompletion<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  handler: OperationCompletionHandler<TData>,
): QueryHookSignature<TData, TVariables> {
  return (options?: QueryHookOptions<TData, TVariables>) => {
    const opts = useOperationOptionsWithCompletion(options, handler);
    return useQuery(query, opts);
  };
}

function createLazyQueryHook<TData = Query, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
): LazyQueryHookSignature<TData, TVariables> {
  return (options?: LazyQueryHookOptions<TData, TVariables>) =>
    useLazyQuery<TData, TVariables>(query, options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLazyQueryHookWithCompletion<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  handler: OperationCompletionHandler<TData>,
): LazyQueryHookSignature<TData, TVariables> {
  return (options?: LazyQueryHookOptions<TData, TVariables>) => {
    const opts = useOperationOptionsWithCompletion(options, handler);
    return useLazyQuery(query, opts);
  };
}

export function createQueryAndLazyQueryHooks<TData = Query, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
): [QueryHookSignature<TData, TVariables>, LazyQueryHookSignature<TData, TVariables>] {
  return [createQueryHook<TData, TVariables>(query), createLazyQueryHook<TData, TVariables>(query)];
}

/**
 * Creates a React query/lazy query hooks for a query with completion/error callbacks.
 *
 * Callbacks passed to this factory will be invoked _before_ any callbacks
 * passed (via options) to the generated hook itself.
 *
 * BE CAREFUL NOT TO DO ANYTHING WITHIN FACTORY CALLBACKS THAT MIGHT DESTROY THE
 * CURRENT EXECUTION CONTEXT (EG. NAVIGATING TO ANOTHER PAGE), OTHERWISE
 * OPTIONS-PROVIDED CALLBACKS WON'T BE CALLED!
 *
 * @param query Query operation to be invoked.
 * @param handler The callback handlers which will be invoked when the query's
 *   `onCompleted` or `onError` event is invoked.
 * @returns The React hooks
 */
export function createQueryAndLazyQueryHooksWithCompletion<
  TData = Query,
  TVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  handler: OperationCompletionHandler<TData>,
): [QueryHookSignature<TData, TVariables>, LazyQueryHookSignature<TData, TVariables>] {
  return [
    createQueryHookWithCompletion<TData, TVariables>(query, handler),
    createLazyQueryHookWithCompletion<TData, TVariables>(query, handler),
  ];
}
