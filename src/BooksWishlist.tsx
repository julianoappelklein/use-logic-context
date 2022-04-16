import { connectWishlistLogic } from "./useWishlistLogic";
import { Wishlist } from "./Wishlist";

export const BooksWishlist = connectWishlistLogic(Wishlist, ({ addToBooksWishlist, removeFromBooksWishlist, state: { booksWishlist } }) => {
  return {
    title: 'Books Wishlist',
    items: booksWishlist,
    addItem: addToBooksWishlist,
    deleteItem: removeFromBooksWishlist,
  };
});