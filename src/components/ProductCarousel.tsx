import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: '1', name: 'T-shirt', description: 'Cool T-shirt', image: '', price: 20 },
  { id: '2', name: 'Jeans', description: 'Stylish Jeans', image: '', price: 50 },
  // ... more products
];

const ProductCarousel: React.FC = () => {
  return (
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCarousel;

export { };
