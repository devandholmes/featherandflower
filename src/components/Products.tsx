import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid, FormControl, Autocomplete, TextField, CardHeader } from '@mui/material';
import { RootState } from '../redux/store';
import { IProduct } from '../types/IProduct';
import { fetchAllProducts } from '../firebaseFunctions/productFunctions';
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../redux/productSlice'
import { fetchProductCategoryFailure, fetchProductCategoryStart, fetchProductCategorySuccess } from '../redux/productCategoriesSlice';
import { fetchAllProductCategories } from '../firebaseFunctions/productCategoryFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { setSnack } from '../redux/snackSlice';


const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.productCategories.productCategories);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isCleared, setIsCleared] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState('');
  const { category } = useParams();

  const filterProducts = useCallback((products: IProduct[], category: string) => {
    dispatch(fetchProductsStart());
    if (category !== '') {
      const filteredProducts = products.filter((product) => product.category === category);
      dispatch(fetchProductsSuccess(filteredProducts));
    } else {
      dispatch(fetchProductsSuccess(products));
    }
  }, [dispatch]);

  useEffect(() => {
    if (category !== undefined && !isCleared) {
      const foundCategory = categories.find((cat) => cat.name === category);
      setSelectedCategory(foundCategory?.id || '');
    }
    dispatch(fetchProductsStart());
    dispatch(fetchProductsSuccess(products));
  }, [category, dispatch, filterProducts, categories, products, isCleared]);


  const handleAddToCart = (product: IProduct) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === product.id);

    dispatch(addItem(product));
  
    if (itemInCart) {
      dispatch(setSnack({
        message: `Quantity of ${product.name} in cart updated`,
        severity: 'info',
      }));
    } else {
      dispatch(setSnack({
        message: `${product.name} added to cart`,
        severity: 'success',
      }));
    }
  };

  useEffect(() => {
    fetchAllProducts().then((products) => {
      if (selectedCategory !== '') {
        filterProducts(products, selectedCategory);
      } else {
        dispatch(fetchProductsSuccess(products));
      }
    }).catch((error) => {
      dispatch(fetchProductsFailure(error));
    });

    fetchAllProductCategories().then((categories) => {
      dispatch(fetchProductCategoryStart());
      dispatch(fetchProductCategorySuccess(categories));
    }).catch((error) => {
      dispatch(fetchProductCategoryFailure(error));
    });
  }, [selectedCategory, dispatch, filterProducts]);

  return (
    <div>
      <Card>
        <CardHeader title="Products" component='h1' />
        <CardContent>
          <FormControl variant="filled" sx={{
            minWidth: 200,
            marginBottom: 2,
          }}>
            <Autocomplete
                value={selectedCategory.length > 0 ? categories.find((cat) => cat.id === selectedCategory) : null}
                onChange={(event, newValue: any) => {
                    if (newValue !== null) {
                      setIsCleared(false);
                      setSelectedCategory(newValue.id);
                      filterProducts(products, newValue.id);
                      navigate(`/products/${newValue.name}`); // Change the URL to the new category
                    } else {
                      setIsCleared(true);
                      setSelectedCategory(''); // Set selected category to an empty string
                      filterProducts(products, ''); // Pass an empty string to filterProducts
                    }
                  }}
                options={categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                clearOnEscape
                />
          </FormControl>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
export default Products;