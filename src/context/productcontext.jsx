// WishlistContext.js
"use client";
import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addProduct = (product) => {
    setWishlist([...wishlist, product]);
  };

  const removeProduct = (index) => {
    setWishlist(wishlist.filter((_, i) => i !== index));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addProduct, removeProduct }}>
      {children}
    </WishlistContext.Provider>
  );
};
