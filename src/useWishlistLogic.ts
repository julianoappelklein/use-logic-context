import { useCallback, useState } from "react";
import { makeBLContext } from "./lib/makeBLContext";
import { guid } from './guid';

interface State {
  booksWishlist: { id: string, text: string }[];
  toysWishlist: { id: string, text: string }[];
  counter: number;
}

const useLogic = () => {
  const [state, setState] = useState<State>({ booksWishlist: [], toysWishlist: [], counter: 0 });

  const addToWishlist = useCallback((type: "books" | "toys", id: string, text: string) => {
    const stateType = type === "books" ? "booksWishlist" : "toysWishlist";
    setState(prevState => ({
      ...prevState,
      [stateType]: [...prevState[stateType], { id, text }]
    }));
  }, []);

  const removeFromWishlist = useCallback((type: "books" | "toys", id: string) => {
    const stateType = type === "books" ? "booksWishlist" : "toysWishlist";
    setState(prevState => ({
      ...prevState,
      [stateType]: prevState[stateType].filter(item => item.id !== id)
    }));
  }, []);

  const addToToysWishlist = useCallback((text: string) => {
    addToWishlist("toys", guid(), text);
  }, [addToWishlist]);

  const addToBooksWishlist = useCallback((text: string) => {
    addToWishlist("books", guid(), text);
  }, [addToWishlist]);

  const removeFromToysWishlist = useCallback((id: string) => {
    removeFromWishlist("toys", id);
  }, [removeFromWishlist]);

  const removeFromBooksWishlist = useCallback((id: string) => {
    removeFromWishlist("books", id);
  }, [removeFromWishlist]);

  const incrementCounter = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      counter: prevState.counter + 1
    }));
  }, []);

  return {
    state,
    removeFromBooksWishlist,
    removeFromToysWishlist,
    addToBooksWishlist,
    addToToysWishlist,
    incrementCounter
  }
}

export const {
  LogicContextProvider: WishlistLogicContextProvider,
  useLogicContext: useWishlistLogicContext,
  connect: connectWishlistLogic,
} = makeBLContext({ useLogic, displayName: "WishlistLogic" });