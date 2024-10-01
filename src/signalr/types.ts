import { HubConnection } from "@microsoft/signalr";
import { DependencyList } from "react";
import { ProviderProps } from "./provider";

export interface Context<T extends Hub> {
  Provider: (Props: ProviderProps) => JSX.Element;
  connection: HubConnection | null;
  shareConnectionBetweenTab: boolean;
  invoke: <
    E extends keyof T["methods"],
    C extends Parameters<T["methods"][E]>,
    R = any,
  >(
    methodName: E,
    ...args: C
  ) => Promise<R> | undefined;
  useSignalREffect: <
    E extends keyof T["callbacks"],
    C extends T["callbacks"][E],
  >(
    events: E,
    callback: C,
    deps: DependencyList,
  ) => void;
  on?: (event: string) => void;
  off?: (event: string) => void;
}

export interface Hub<T extends string = string, M extends string = string> {
  callbacks: {
    [name in T]: (...args: any[]) => void;
  };
  methods: {
    [name in M]: (...args: any[]) => void;
  };
}
