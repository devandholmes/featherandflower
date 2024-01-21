import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store'; // Adjust the path as needed
import { login } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { Button, Card, CardActionArea, CardContent, CardHeader, Input, TextField } from '@mui/material';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    }}>
      <Card>
        <CardHeader title="Admin Login" />
        <CardContent>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </CardContent>
        <CardActionArea onClick={handleSubmit}>
          <CardContent>
            <Button
              color='primary'
              variant='outlined'
              fullWidth
              disabled={loading}              
            >
              Login
            </Button>
          </CardContent>
        </CardActionArea>

      </Card>
    </div>
  );
};

export default Login;
