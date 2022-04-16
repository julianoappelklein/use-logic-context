import * as React from 'react';
import { connectWishlistLogic } from "./useWishlistLogic";

export const Counter = ({ count, onIncrement }: { count: number, onIncrement: () => void }) => (<button onClick={onIncrement}>Clicked count: {count}</button>);

Counter.displayName = "Counter";

export const ConnectedCounter = connectWishlistLogic(Counter, ({ state: { counter }, incrementCounter }) => ({
  count: counter,
  onIncrement: incrementCounter,
}));