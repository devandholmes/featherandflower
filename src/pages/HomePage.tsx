import React from 'react';
import ProductCategories from '../components/ProductCategories';


const HomePage = () => {

    

    return (
        <div style={{
            backgroundColor: '#1a3842 ',
            height: '100vh',
        }}>
            <ProductCategories products={[]} />
        </div>
    );
};

export default HomePage;