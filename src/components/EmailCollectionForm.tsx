import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure to export 'db' from your firebase.ts file

const EmailCollectionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'emails'), {
        email,
      });
      console.log('Document written with ID: ', docRef.id);
      setSubmitted(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Subscribe for Updates</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Subscribe
      </Button>
      {submitted && <Typography variant="body2">Thank you for subscribing!</Typography>}
    </form>
  );
};

export default EmailCollectionForm;

export { };