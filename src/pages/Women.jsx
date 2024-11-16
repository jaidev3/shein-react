import React from 'react';
import Navigation from '../components/Navigation';
import ProductList from '../components/ProductList';

// Mock data for women's products
const womenProducts = [
  {
    id: 'w1',
    name: 'Floral Print Maxi Dress',
    price: 39.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-15',
    colors: ['Blue', 'Red'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'w2',
    name: 'High-Waist Skinny Jeans',
    price: 45.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-14',
    colors: ['Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'w3',
    name: 'Crop Top',
    price: 19.99,
    image: 'https://via.placeholder.com/300x400',
    date: '2023-05-13',
    colors: ['White', 'Black', 'Red'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  // Add more products as needed
];

const Women = () => {
  return (
    <>
      {/* <Navigation /> */}
      <ProductList category="Women's Fashion" products={womenProducts} />
    </>
  );
};

export default Women;
