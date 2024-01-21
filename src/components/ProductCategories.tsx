import React from 'react';
import FlipCard from './FlipCard';
import { Grid } from '@mui/material';
import { IProductCategory } from '../types/IProductCategory';

interface ProductCategoriesProps {
    products: IProductCategory[];
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ products }) => {


    return (
        <div>            
            <Grid>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>
                    {products.map((item, index) => {
                        return (
                            <FlipCard
                                key={index}
                                cardImage={item.image}
                                title={item.name}
                                frontImage={item.image}
                                backImage={item.backImage}
                                description=''
                            />
                        );
                    })}
                </div>
            </Grid>
        </div>
    );
};

export default ProductCategories;