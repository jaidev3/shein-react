import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Load recently viewed products from localStorage
    const storedProducts = localStorage.getItem('recentlyViewed');
    if (storedProducts) {
      setRecentlyViewed(JSON.parse(storedProducts));
    }
  }, []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      // Remove the product if it already exists
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add the product to the beginning of the array
      const updated = [product, ...filtered].slice(0, 12); // Keep only the last 12 items
      // Save to localStorage
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
  };

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export default RecentlyViewedContext;
