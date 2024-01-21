import React, { useEffect } from "react";
import moment from 'moment';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    Button
} from '@mui/material';
import { IProduct } from "../types/IProduct";
import { db } from "../firebase";

const PurchaseComplete = () => {
    const cartItems: IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const totalPrice = cartItems.reduce((total, item) => total + Number(item.sellingPrice || 0), 0);
    const deliveryType = JSON.parse(localStorage.getItem('deliveryType') || '');

    function GenerateOrderNumber(ud: any) {
        // Assuming ud has userName, userSurname, userEmailAddress, and userMobileNumber properties
        const userName = ud.userName;
        const userSurname = ud.userSurname;
        const userEmail = ud.userEmailAddress;
        const userMobile = ud.userMobileNumber;

        const orderNumber = `${userName[0]}${userSurname[0]}${userEmail.substring(0, 3)}${userMobile.substring(userMobile.length - 4)}`;

        return orderNumber;
    }

    useEffect(() => {
        const createOrder = async () => {
            const orderNumber = GenerateOrderNumber(userDetails);
            const order = {
                user: userDetails,
                items: cartItems,
                total: totalPrice,
                date: moment().format('MM/DD/YYYY'),
                orderNumber: orderNumber,
                deliveryType: deliveryType
            };

            await db.collection('orders').doc(orderNumber).set(order);

            // Mark items as sold
            for (const item of cartItems) {
                await db.collection('products').doc(item.id).update({
                    isSoldOut: true
                });
            }
        };

        createOrder();
    }, [cartItems, userDetails, totalPrice, deliveryType]);

    return (
        <div style={{
            paddingTop: '200px'
        }}>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Purchase Complete
                    </Typography>
                    <Typography variant="h5" component="h2" align="center" gutterBottom>
                        Items Purchased:
                    </Typography>
                    <Grid container spacing={2} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollbarWidth: 'none', // for Firefox
                        msOverflowStyle: 'none', // for Internet Explorer and Edge
                    }}>
                        {cartItems.map((item: IProduct, index: number) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: {item.sellingPrice}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Description: {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" component="h2" align="center" gutterBottom>
                            Total Price: {totalPrice}
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" href="/products/pants">
                                Continue Shopping
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default PurchaseComplete;