import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('uniquee_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('uniquee_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item._id === product._id);
      if (exists) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item._id === id);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item._id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
