import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../redux/productSlice';
import { db } from '../firebase';
import { clearCart } from '../redux/cartSlice';


const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const loading = useSelector((state: any) => state.products.loading);
  const error = useSelector((state: any) => state.products.error);
  const cartitems = useSelector((state: any) => state.cart.cartItems);
  const total = cartitems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);


  useEffect(() => {
    dispatch(fetchProductsStart());

    db.collection('products').get()
      .then(snapshot => {
        const productList : any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(fetchProductsSuccess(productList));
      })
      .catch(err => {
        dispatch(fetchProductsFailure(err.message));
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            {/* Add to cart button and other details here */}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => {
      // For now, just clear the cart on checkout
      dispatch(clearCart());
      alert('Order placed successfully!');
    }}>
      Checkout
    </button>
    </div>  );
};

export default Cart;
