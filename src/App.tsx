import * as React from 'react';
import { BooksWishlist } from './BooksWishlist';
import { ConnectedCounter } from './Counter';
import { ToysWishlist } from './ToysWishlist';

export const App = () => {
  return (
    <div>
      <h1>Hello Wishlist</h1>
      <div style={{ display: 'flex', maxWidth: 500 }}>
        <div style={{ flex: 1 }}>
          <ToysWishlist />
        </div>
        <div style={{ flex: 1 }}>
          <BooksWishlist />
        </div>
      </div>
      <ConnectedCounter />
    </div>
  );
};
App.displayName = 'App';