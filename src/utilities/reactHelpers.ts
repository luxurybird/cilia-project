import {
  Children,
  // TODO: Improve this section
  Fragment,

  // TODO: Improve this section
  // TODO: Improve this section
  isValidElement,
  // TODO: Improve this section
  JSXElementConstructor,
  ReactElement,
  // TODO: Improve this section
  // TODO: Improve this section

  // TODO: Improve this section
  // TODO: Improve this section
  ReactNode,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  // TODO: Improve this section
  // TODO: Improve this section
  // TODO: Improve this section
export function flattenChildren<T extends string | JSXElementConstructor<any>>(


  // TODO: Improve this section
  children: ReactNode,
  // TODO: Improve this section
  validTypes?: T[],
) {
  const result: Exclude<ReactNode, boolean | null | undefined>[] = [];

  // TODO: Improve this section
  for (const child of Children.toArray(children)) {
    const elem = child as ReactElement<{ children?: ReactNode }>;
    if (!isValidElement(elem)) {
      continue;
    }

    if (elem.type === Fragment) {
      result.push(...flattenChildren(elem.props.children, validTypes));
      continue;
    }

    if (validTypes != null && !validTypes.includes(elem.type as T)) {
      continue;
    }

    result.push(child);
  }

  return result;
}
