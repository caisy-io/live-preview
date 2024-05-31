type Callback<T = any> = (...args: T[]) => void;

export interface PubSub {
  on: <T = any>(event: string, callback: Callback<T>) => void;
  emit: <T = any>(event: string, data: T[]) => void;
  off: (event: string, callback: Callback) => void;
}

export const createPubSub = (): PubSub => {
  const events: { [key: string]: Callback[] } = {};

  const on: PubSub["on"] = (event, callback) => {
    if (!events[event]) {
      events[event] = [];
    }
    events[event]?.push(callback);
  };

  const emit: PubSub["emit"] = (event, data) => {
    if (events[event]) {
      events[event]?.forEach((callback) => callback(...data));
    }
  };

  const off: PubSub["off"] = (event, callback) => {
    if (events[event]) {
      events[event] = events[event]?.filter((cb) => cb !== callback) || [];
    }
  };

  return { on, emit, off };
};

export default createPubSub;