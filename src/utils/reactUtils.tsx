import React from 'react';

export function withProps(props: any) {
  return function injectProps(WrappedComponent: JSX.Element) {
    return React.cloneElement(WrappedComponent, props)
  }
}
