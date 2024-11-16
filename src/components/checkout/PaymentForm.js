import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';

const PaymentForm = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    // Format expiry date
    if (name === 'expDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod, ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          row
          name="payment-method"
          value={paymentMethod}
          onChange={handleMethodChange}
        >
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CreditCardIcon sx={{ mr: 1 }} /> Credit Card
              </Box>
            }
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PaymentIcon sx={{ mr: 1 }} /> PayPal
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'credit' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on Card"
              fullWidth
              variant="outlined"
              value={formData.cardName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              fullWidth
              variant="outlined"
              value={formData.cardNumber}
              onChange={handleChange}
              inputProps={{ maxLength: 19 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry Date"
              fullWidth
              variant="outlined"
              placeholder="MM/YY"
              value={formData.expDate}
              onChange={handleChange}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.cvv}
              onChange={handleChange}
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'paypal' && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You will be redirected to PayPal to complete your payment.
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 3 }}
      >
        {paymentMethod === 'credit' ? 'Continue to Review' : 'Continue to PayPal'}
      </Button>
    </form>
  );
};

export default PaymentForm;
