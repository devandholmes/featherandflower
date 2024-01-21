import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { mdiCart, mdiThemeLightDark } from '@mdi/js';
import Avatar from '@mui/material/Avatar';
import AvatarImage from "../assets/FeatherAndFlower.png";
import { Tooltip, Menu, MenuItem, Button } from '@mui/material';
import Icon from '@mdi/react';
import { useSelector } from 'react-redux';
import Cart from './Cart';

interface CustomAppBarProps {
    dark: boolean;
    darkToggle: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ dark, darkToggle }) => {

    const logoDimensions = 150;
    const [clickCount, setClickCount] = React.useState(0);
    const clickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const cartItems = useSelector((state: any) => state.cart.items);
    console.log(cartItems);


    function handleLogoClick() {
        setClickCount(prevCount => prevCount + 1);
        console.log(clickCount);

        if (clickCount === 0) {
            clickTimer.current = setTimeout(() => {
                setClickCount(0);
                window.location.href = "/";
            }, 1000);
        } else if (clickCount === 2) {
            if (clickTimer.current) {
                clearTimeout(clickTimer.current);
            }
            window.location.href = "/admin";
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="Toggle Dark Mode" sx={{
                            float: 'left',
                            fontSize: '1.5em',
                        }}>
                            <IconButton color="secondary" onClick={darkToggle}>
                                <Icon path={mdiThemeLightDark} size={1.3} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ textAlign: 'center', alignItems: 'center' }} onClick={() => {handleLogoClick()}}>
                        <Typography variant="h2" component="div" >
                            Feather & Flower
                        </Typography>
                        <Avatar alt="Feather & Flower" src={AvatarImage} sx={{
                            width: logoDimensions,
                            height: logoDimensions,
                            margin: 'auto',
                            marginBottom: '-60px',
                            position: 'relative', // Set position to relative
                            paddingTop: '0px', // Add padding to the top and bottom
                            bottom: '-15px' // Move it downward
                        }}
                        />
                    </Box>                   
                    <Box sx={{ flexGrow: 1 }}>       
                        <Cart />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default CustomAppBar;
