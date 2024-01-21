import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure to export 'db' from your firebase.ts file


interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };
    const handlePayflexPayment = async () => {
        // Step 1: Initialize payment by calling your backend
        // const paymentUrl = await fetch('/api/initializePayment');
      
        // Step 2: Redirect to the Payflex payment page
        // window.location.href = paymentUrl;
      
        // OR use Payflex SDK to handle the payment
      
        // Step 3: Verify payment by calling your backend
        // const paymentStatus = await fetch('/api/verifyPayment');
      
        // If payment is successful, record the purchase
        if (true /* Replace with actual payment status */) {
          handlePurchase();
        }
      };
      

    const handlePurchase = async () => {
        // TODO: Collect email from user
        const userEmail = "example@example.com"; // Replace this with the actual email

        try {
            const docRef = await addDoc(collection(db, 'purchases'), {
                email: userEmail,
                productId: product.id,
                timestamp: new Date(),
            });
            console.log("Purchase recorded with ID: ", docRef.id);
        } catch (error) {
            console.error("Error recording purchase: ", error);
        }
    };

    return (
        <Card onClick={flipCard} sx={{ width: 300, transform: isFlipped ? 'rotateY(180deg)' : 'none', transition: 'transform 0.5s' }}>
            <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{isFlipped ? product.description : `$${product.price}`}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handlePurchase}>Buy Now</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;


export { };