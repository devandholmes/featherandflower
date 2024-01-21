import React, {useState } from 'react';
import { Box,  Tab, Tabs } from '@mui/material';
import ManageProducts from '../components/Admin/ManageProducts';
import ManageProductCategory from '../components/Admin/ManageProductCategory';
import ManageDiscountCodes from '../components/Admin/ManageDiscountCodes';
import Orders from '../components/Admin/Orders';

const Admin: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
    
  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}>
          <Tab label="Products" />
          <Tab label="Product Category" />
          <Tab label="Sale" />
          <Tab label="Orders" />
          </Tabs>
          

          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <ManageProducts />
            </Box>
          )}
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <ManageProductCategory />
            </Box>
          )}
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              <ManageDiscountCodes />
            </Box>
          )}
          {value === 3 && (
            <Box sx={{ p: 3 }}>
              <Orders />
            </Box>
          )}
      </Box>      
    </Box>
    </div>
  );
};

export default Admin;
