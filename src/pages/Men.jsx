import React from 'react';
import Navigation from '../components/Navigation';
import ProductList from '../components/ProductList';

// Mock data for men's products
const menProducts = [
  {
    id: 'm1',
    name: 'Classic Fit T-Shirt',
    price: 24.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-15',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm2',
    name: 'Slim Fit Jeans',
    price: 49.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-14',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm3',
    name: 'Casual Oxford Shirt',
    price: 34.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-13',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  // Add more products as needed
];

const Men = () => {
  return (
    <>
      {/* <Navigation /> */}
      <ProductList category="Men's Fashion" products={menProducts} />
    </>
  );
};

export default Men;
