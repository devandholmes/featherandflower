import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'firebase/firestore';
import ProductCategories from '../components/ProductCategories';
import { fetchProductCategoryStart, fetchProductCategorySuccess } from '../redux/productCategoriesSlice';
import { fetchAllProductCategories } from '../firebaseFunctions/productCategoryFunctions';
import { Card, CardContent, CardHeader } from '@mui/material';
import { fetchAllProducts } from '../firebaseFunctions/productFunctions';
import { fetchProductsSuccess } from '../redux/productSlice';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const productCategories = useSelector((state: any) => state.productCategories.productCategories);
  const loading = useSelector((state: any) => state.products.loading);
  const error = useSelector((state: any) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductCategoryStart());
    fetchAllProductCategories().then((productList) => {
      dispatch(fetchProductCategorySuccess(productList));
    });
    fetchAllProducts().then((productList) => {
      dispatch(fetchProductsSuccess(productList));
    });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Card sx={{
        height: '77vh',
      }}>
        <CardHeader title='Product Categories' component='h1' sx={{
          textAlign: 'left',
          margin: '1rem 0 0 1rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'primary.main',
        }} />
          <CardContent>
            <ProductCategories products={productCategories} />
          </CardContent>
      </Card>   
    </div>
  );
};

export default Home;
