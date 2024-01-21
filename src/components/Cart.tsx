import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Menu, Typography, IconButton, Card, CardContent, CardActions, Tooltip, Box, CardMedia, Tabs, Tab, TextField, Button, CardHeader } from '@mui/material';
import { mdiCart, mdiTrashCanOutline, mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import {removeItem} from '../redux/cartSlice';
import {setSnack} from '../redux/snackSlice';
import {cancelUrl,devPayFastUrl,livePayFastUrl,merchantId,merchantKey,paymentId,paymentMethod,returnUrl} from '../config.js';


const Cart = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + Number(item.sellingPrice || 0), 0);  
  const [deliveryType, setDeliveryType] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const deliveryOptions = [
    { value: 'Pudo Locker', cost: 60 },
    { value: 'Pudo Door', cost: 60 },
    { value: 'Paxi', cost: 60 },
    { value: 'Collection', cost: 0 },
  ];
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmailAddress, setUserEmailAddress] = useState('');
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [errors, setErrors] = useState({
    userName: 'User Name is Required',
    userSurname: 'User Surname is Required',
    userEmailAddress: 'User Email Address is Required',
    userMobileNumber: 'User Mobile Number is Required',
  } as any);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(tabValue);
    setTabValue(newValue);
  };

  function startCheckout() {
    if (tabValue === 0) {
      setTabValue(1);
    } else if (tabValue === 1) {
      setTabValue(2);
    } else if (tabValue === 2) {

      var itemNames = "";
      cartItems.forEach(item => {
        itemNames += item.name + ", ";
      });

      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('userDetails', JSON.stringify({
        userName,
        userSurname,
        userEmailAddress,
        userMobileNumber,
      }));
      localStorage.setItem('deliveryType', JSON.stringify(deliveryType));

      const deliveryCost:number = deliveryOptions.find(option => option.value === deliveryType)?.cost || 0;
      const totalWithDelivery = total + deliveryCost;

      const pfUrl = devPayFastUrl + new URLSearchParams({
        merchant_id: merchantId,
        merchant_key: merchantKey,
        amount: totalWithDelivery.toFixed(2),
        item_name: itemNames,
        return_url: returnUrl,
        email_address: userEmailAddress,
        name_first: userName,
        name_last: userSurname,
        cell_number: userMobileNumber,
        payment_method: paymentMethod,
        cancel_url: cancelUrl,
        payment_id: generateGUID(),
      });
      window.open(pfUrl, '_blank');
    }
  }
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } 

  function validateForm(): void {
    console.log('TABVALUE',tabValue);
    // check if there are currently any errors on the tab section that we are currently in 
    if(tabValue === 0) {
      if(deliveryType === '') {
        setSnack({
          message: 'Please select a delivery type',
          severity: 'error',
        });
      }
      setTabValue(1);
    }
    if(tabValue === 1) {
      
      setTabValue(2);
    }
    if(tabValue === 2) {
      if(errors.userName !== '' || errors.userSurname !== '' || errors.userEmailAddress !== '' || errors.userMobileNumber !== '') {
        dispatch(setSnack({
          message: 'Please complete all fields before proceeding',
          severity: 'error',
        }));
        return;
      }
      setErrors(errors);
      startCheckout();
    }
  }

  function handleTextFieldEdit(field:string, value: string): void {
    switch(field) {
      case 'Name':
        setUserName(value);
        if(value === '') {
          setErrors({...errors, userName: 'User Name is Required'});
        } else {
          setErrors({...errors, userName: ''});
        }
        break;
      case 'Surname':
        setUserSurname(value);
        if(value === '') {
          setErrors({...errors, userSurname: 'User Surname is Required'});
        } else {
          setErrors({...errors, userSurname: ''});
        }
        break;
      case 'Email Address':
        ValidateEmailAddress(value);
        setUserEmailAddress(value);
        break;
      case 'Mobile Number':
        setUserMobileNumber(value);
        if(value === '') {
          setErrors({...errors, userMobileNumber: 'User Mobile Number is Required'});
        } else {
          setErrors({...errors, userMobileNumber: ''});
        }
        break;
      default:
        break;
    }
  }

  function CheckForButtonDisabled() {
    // Implement your logic here and return a boolean value
    if(tabValue === 1 && deliveryType === '') {
      return true;
    }
    if(tabValue === 2 &&(errors.userName !== '' || errors.userSurname !== '' || errors.userEmailAddress !== '' || errors.userMobileNumber !== '')) {
      return true;
    }
    return false;
  }
  function ValidateEmailAddress(value: string) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailRegex.test(value)) {
      console.log('Please enter a valid email address');
      setErrors({...errors, userEmailAddress: 'Please enter a valid email address'});
      return;
    }
    setErrors({...errors, userEmailAddress: ''});
  }

  return (
    <div style={{ minWidth: '100%' }}>
      <Tooltip title="Cart" sx={{ float: 'right', fontSize: '1.5em' }}>
        <IconButton color="inherit" onClick={handleClick}>
          <Icon path={mdiCart} size={1.3} style={{ color: '#f8b55a' }}/>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Card>
          <CardHeader title="Shopping Cart" />
          <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Items" />
          <Tab label="Delivery Type" />
          <Tab label="Contact" />
        </Tabs>
        {tabValue === 0 && (
          <>
            {cartItems.map(item => (
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                  />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: R{item.sellingPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Remove from cart">
                    <IconButton onClick={() => dispatch(removeItem(item.id))} style={{
                      marginLeft: 'auto',
                      color: 'red',
                    }}>
                      <Icon path={mdiTrashCanOutline} size={1} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            ))}
            <Typography variant="h6" sx={{
              marginTop: '1em',
              marginBottom: '1em',
              padding: '1em',
            }}>
              Total: R{total.toFixed(2)}
            </Typography>
          </>
        )}
        {tabValue === 1 && (
          <>
            <Typography variant="h6" sx={{
              marginTop: '1em',
              marginBottom: '1em',
              padding: '1em',
              borderBottom: '1px solid #ccc',
            }}>
              Delivery Type
            </Typography>
            {deliveryOptions.map(option => (
              // Radio Buttons
              <Box sx={{ 
                padding: '1em',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}>
                <input
                  type="radio"
                  name="deliveryType"
                  value={option.value}
                  onChange={(e) => setDeliveryType(e.target.value)}
                />
                {option.value} - R{option.cost}
              </Box>
            ))}
          </>
        )}
        {tabValue === 2 && (
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Enter your Name"
              value={userName}
              onChange={(e) => handleTextFieldEdit("Name",e.target.value)}
              required
              error={Boolean(errors.userName)}
              helperText={errors.userName}
              sx={{
                marginBottom: '1em',
              }}
            />
            <TextField
              label="Surname"
              type="text"
              required
              placeholder="Enter your Surname"
              value={userSurname}
              onChange={(e) => handleTextFieldEdit("Surname",e.target.value)}
              error={Boolean(errors.userSurname)}
              helperText={errors.userSurname}
              sx={{
                marginBottom: '1em',
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              required
              placeholder="Enter your Email Address"
              value={userEmailAddress}
              onChange={(e) => handleTextFieldEdit("Email Address",e.target.value)}
              error={Boolean(errors.userEmailAddress)}
              helperText={errors.userEmailAddress}
              sx={{
                marginBottom: '1em',
              }}
            />
            <TextField
            required
              label="Mobile Number"
              type="text"
              placeholder="Enter your Mobile Number"
              value={userMobileNumber}
              onChange={(e) => handleTextFieldEdit("Mobile Number",e.target.value)}
              error={Boolean(errors.userMobileNumber)}
              helperText={errors.userMobileNumber}
              sx={{
                marginBottom: '1em',
              }}
            />
          </Box>
        )}        
          </CardContent>
          <CardActions>
          <Button fullWidth onClick={() => validateForm()} disabled={!!CheckForButtonDisabled()}>
            {tabValue === 0 && 'Continue to Delivery Type'}
            {tabValue === 1 && 'Continue to Contact'}
            {tabValue === 2 && 'Pay Now'}
            <Icon path={mdiArrowRight} size={1} style={{ marginLeft: '0.5em' }}/>
          </Button>
          </CardActions>
        </Card>
      </Menu>
    </div>
  );
};

export default Cart;


