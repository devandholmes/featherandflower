import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Cart from './views/Cart';
import Admin from './views/Admin';
import { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Admin/Login';
import CustomAppBar from './components/CustomAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Products from './components/Products';
import PurchaseComplete from './components/PurchaseComplete';
import { Alert, Snackbar } from '@mui/material';
import { closeSnack } from './redux/snackSlice'; // import the closeSnack action
import Footer from './components/Footer';



const App: React.FC = () => {
    const snack = useSelector((state: RootState) => state.snack); // get the snackbar state
    const dispatch = useDispatch(); // get the dispatch function
    const user = useSelector((state: RootState) => state.auth.user);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return JSON.parse(saved!) || false;
    });
    const toggleDarkMode = () => {
        // set dark mode in cookie
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
        setDarkMode(!darkMode); // Toggle dark mode on and off
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',  // Toggle between 'dark' and 'light'
            primary: {
                main: '#137475', // Teal
                // darkteal
                // main: '#0b5351',
            },
            secondary: {
                main: '#f8b55a', // Gold
            },
            error: {
                main: '#FFC0CB', // Pink
            },
        },
        typography: {
            fontFamily: "'Amatic SC'",
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        color: darkMode ? '#fff' : '#137475',
                        backgroundColor: darkMode ? '#137475' : '#f8b55a',
                        borderBottom: '1px solid #137475',
                        ":hover": {
                            backgroundColor: darkMode ? '#fff' : '#137475',
                            color: darkMode ? '#137475' : '#fff',
                            borderColor: darkMode ? '#fff' : '#000',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        color: darkMode ? '#fff' : '#000',
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: darkMode ? '#fff' : '#137475',
                        fontWeight: 'bold',
                    },
                },
            },
            MuiGrid: {
                styleOverrides: {
                    root: {
                        color: darkMode ? '#fff' : '#000',
                        backgroundColor: darkMode ? '#000' : '#fff',
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: darkMode ? '#fff' : '#f8b55a',
                    },
                },
            },            
        },


    });

    return (
        <ThemeProvider theme={theme}>
            <Snackbar 
                open={snack.open} 
                onClose={() => dispatch(closeSnack())} // close the snackbar when the close icon is clicked
                autoHideDuration={2000} // auto close the snackbar after 5 seconds
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // position the snackbar at the top middle
            >
                <Alert onClose={() => dispatch(closeSnack())} severity={snack.severity}>
                    {snack.message}
                </Alert>
            </Snackbar>
            <CustomAppBar dark={darkMode} darkToggle={toggleDarkMode} />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin" element={user ? <Admin /> : <Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/products/:category" element={<Products />} />
                    <Route path="/complete" element={<PurchaseComplete />} />
                </Routes>
            </Router>
            {/* <Footer /> */}
        </ThemeProvider>
    );
};

export default App;
