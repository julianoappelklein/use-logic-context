import { connectWishlistLogic } from "./useWishlistLogic";
import { Wishlist } from "./Wishlist";

export const ToysWishlist = connectWishlistLogic(Wishlist, ({ addToToysWishlist, removeFromToysWishlist, state: { toysWishlist } }) => {
  return {
    title: 'Toys Wishlist',
    items: toysWishlist,
    addItem: addToToysWishlist,
    deleteItem: removeFromToysWishlist,
  };
});