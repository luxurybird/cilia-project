  // TODO: Improve this section
import {
  // TODO: Improve this section
  DocumentNode,
  // TODO: Improve this section
  MutationHookOptions,

  OperationVariables,
  TypedDocumentNode,

  // TODO: Improve this section
  useMutation,

} from '@apollo/client';

import { Maybe, Mutation, UserAccessToken } from '../types/graphql';
import { getOperationFieldName } from '../utilities/graphql';
import { updateAccessToken } from '../modules/core/redux/commonActions';
import {
  MutationHookSignature,

  OperationCompletionHandler,
  useOperationOptionsWithCompletion,
} from './createOperationHook';

type AuthenticationResponseTypeByMutationName<K extends keyof Mutation> = Mutation[K] extends
  | Maybe<UserAccessToken>
  | undefined
  ? Mutation[K]
  : never;

type AuthenticationMutationName = Exclude<
  {
    [K in keyof Mutation]: AuthenticationResponseTypeByMutationName<K> extends never ? never : K;
  }[keyof Mutation],
  undefined
>;

// eslint-disable-next-line import/no-unused-modules
export function createMutationHook<TData = Mutation, TVariables = OperationVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
): MutationHookSignature<TData, TVariables> {
  return (options?: MutationHookOptions<TData, TVariables>) =>
    useMutation<TData, TVariables>(mutation, options);
}

/**
 * Creates a React hook for a mutation with completion/error callbacks.
 *
 * Callbacks passed to this factory will be invoked _before_ any callbacks
 * passed (via options) to the generated hook itself.
 *
 * BE CAREFUL NOT TO DO ANYTHING WITHIN FACTORY CALLBACKS THAT MIGHT DESTROY THE
 * CURRENT EXECUTION CONTEXT (EG. NAVIGATING TO ANOTHER PAGE), OTHERWISE
 * OPTIONS-PROVIDED CALLBACKS WON'T BE CALLED!
 *
 * @param mutation Mutation operation to be invoked.
 * @param handler The callback handlers which will be invoked when the mutation's
 *   `onCompleted` or `onError` event is invoked.
 * @returns The React hook
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createMutationHookWithCompletion<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  handler: OperationCompletionHandler<TData>,
): MutationHookSignature<TData, TVariables> {
  return (options?: MutationHookOptions<TData, TVariables>) => {
    const opts = useOperationOptionsWithCompletion(options, handler);
    return useMutation(mutation, opts);
  };
}

export function createAuthenticationMutationHook<
  TData extends Pick<Mutation, AuthenticationMutationName>,
  TVariables = OperationVariables,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
): MutationHookSignature<TData, TVariables> {
  const mutationName = getOperationFieldName(mutation) as AuthenticationMutationName;
  return createMutationHookWithCompletion<TData, TVariables>(mutation, {
    onCompleted: (data, client) => {
      const response = data?.[mutationName];
      if (response && response.accessToken) {
        client.store.dispatch(
          updateAccessToken({
            accessToken: response.accessToken,
            user: response.user,
          }),
        );
      }
    },
  });
}
