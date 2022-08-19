/* eslint-disable @typescript-eslint/no-explicit-any */

type SetBatch = (updates: Record<string, any>) => void;
type SetSingle = (key: string, item: any, blockKey?: string) => void;

export type Callback = (...args: any[]) => any;

export type Store = {
  get;
  getBlockHandler;
  update;
  set;
  setBlockHandler;
};

export type Pubsub = {
  subscribe: (key: string, callback: Callback) => void;
  unsubscribe: (key: string, callback: Callback) => void;
  update: (key: string, newData: any, blockKey?: string) => void;
  set: (...args: Parameters<SetBatch | SetSingle>) => void;
  setBlockHandler: (key: string, blockKey: string, item: any) => void;
  get: (key: string) => any;
  getBlockHandler: (key: string, blockKey?: string) => any;
  store: Store;
  getBlockData: (opts: { key: string; blockKey?: string }) => any;
  setBlockData: (opts: { key: string; blockKey?: string; item: any }) => any;
  subscribeOnBlock: (opts: {
    key: string;
    blockKey: string | undefined;
    callback: Callback;
  }) => void;
};
