// Copyright 2021 Green Badger LLC

import { Container, interfaces } from "inversify";
import { useLayoutEffect, useState } from "react";

let container: Container;

function setContainer(iocContainer: Container) {
  container = iocContainer;
}

export interface IBLoC<TProps = unknown, TParams = unknown> {
  onParamsChange(props: TProps, params: TParams): void;
}

export const InitialPropsSymbol = Symbol.for("initialProps");
export const NavigationParamsSymbol = Symbol.for("navigationParams");

function useBLoC2<T extends IBLoC<TProps>, TProps extends Record<string, any>>(
  ctor: interfaces.Newable<T>,
  props: TProps
): T {
  const [bloc] = useState(() => {
    const BLoCContainer = container.createChild();
    const { match: { params = {} } = {}, ...otherProps } = props;

    BLoCContainer.bind(InitialPropsSymbol).toConstantValue(otherProps);
    BLoCContainer.bind(NavigationParamsSymbol).toConstantValue(params);

    return BLoCContainer.resolve(ctor);
  });

  useLayoutEffect(() => {
    const { match: { params = {} } = {}, ...otherProps } = props;

    bloc.onParamsChange(otherProps as TProps, params);
  }, [bloc, props, props.match]);

  return bloc;
}

const ioc = {
  setContainer,
  useBLoC2,
  // useIoC,
};

export default ioc;

// function
