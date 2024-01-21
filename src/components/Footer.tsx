import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{ backgroundColor: '#f8f9fa', position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction label="Terms and Conditions" icon={<InfoIcon />} href="/terms-and-conditions" />
      <BottomNavigationAction label="FAQ" icon={<HelpIcon />} href="/faq" />
      <BottomNavigationAction label="Created by Devan Holmes" icon={<MailIcon />} href="mailto:developer@example.com" />
    </BottomNavigation>
  );
};

export default Footer;