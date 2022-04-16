import * as React from "react";

export function makeLogicContext<LogicFacade, LogicProps>({
  useLogic,
  displayName
}: {
  useLogic: (props: LogicProps) => LogicFacade;
  displayName?: string;
}) {
  const ContainerContext = React.createContext<LogicFacade>(null as any);

  const ContainerContextProvider = (props: LogicProps & { children: React.ReactNode }) => {
    const { children, ...rest } = props;
    const facade = useLogic(rest as any);
    return <ContainerContext.Provider value={{ ...facade }}>{children}</ContainerContext.Provider>;
  };

  ContainerContextProvider.displayName = displayName ? `${displayName}ContextProvider` : "LogicContextProvider";

  return {
    useLogicContext: () => {
      return React.useContext(ContainerContext);
    },
    LogicContextProvider: ContainerContextProvider,
    connect: function <Props, OwnProps = unknown>(
      Component: React.FunctionComponent<Props>,
      contextToProps: (logicProps: LogicFacade, ownProps?: OwnProps) => Props,
    ) {
      return connectHooks(Component, (ownProps) => {
        const context = React.useContext(ContainerContext);
        return contextToProps(context, ownProps as any);
      }, displayName);
    }
  };
}

export const connectHooks = function<Props, OwnProps = unknown>(
  Component: React.FunctionComponent<Props>,
  useHooks: (ownProps?: OwnProps) => Props,
  displayName?: string,
) {
  const HookConnectedComponent = function (ownProps?: OwnProps) {
    const lastProps = React.useRef<Props>(null as any);
    const lastNode = React.useRef<any>(null as any);
    const props = useHooks(ownProps);
    const shouldUpdate = lastNode.current == null || !isShallowEqualObject(lastProps.current, props);
    if (shouldUpdate) {
      lastNode.current = (<Component {...props} />);
    }
    lastProps.current = props;
    return (lastNode.current);
  };
  HookConnectedComponent.displayName = displayName? `${displayName}Connection` : 'HookConnection';
  return HookConnectedComponent;
}

function isShallowEqualObject(a: any, b: any) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (Object.keys(a).length !== Object.keys(b).length){
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {return false;}
  }
  return true;
}