import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardHolder: 'John Doe',
      expiryDate: '12/24',
      type: 'visa',
      isDefault: true,
    },
    {
      id: 2,
      cardNumber: '**** **** **** 5678',
      cardHolder: 'John Doe',
      expiryDate: '03/25',
      type: 'mastercard',
      isDefault: false,
    },
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    type: 'visa',
  });
  const [error, setError] = useState('');

  const handleAddCard = () => {
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate || !newCard.cvv) {
      setError('All fields are required');
      return;
    }

    // Validate card number (basic check)
    if (newCard.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Invalid card number');
      return;
    }

    // Validate expiry date format (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(newCard.expiryDate)) {
      setError('Invalid expiry date format (MM/YY)');
      return;
    }

    // Validate CVV (3 or 4 digits)
    if (!/^[0-9]{3,4}$/.test(newCard.cvv)) {
      setError('Invalid CVV');
      return;
    }

    // Add new card
    const maskedCardNumber = '**** **** **** ' + newCard.cardNumber.slice(-4);
    const newPaymentMethod = {
      id: Date.now(),
      cardNumber: maskedCardNumber,
      cardHolder: newCard.cardHolder,
      expiryDate: newCard.expiryDate,
      type: newCard.type,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      type: 'visa',
    });
    setError('');
  };

  const handleDeleteCard = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleInputChange = (field) => (event) => {
    setNewCard((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Payment Methods</Typography>
        <Button
          variant="contained"
          startIcon={<CreditCardIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add New Card
        </Button>
      </Box>

      <List>
        {paymentMethods.map((method) => (
          <Card key={method.id} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    {method.type.toUpperCase()} {method.isDefault && '(Default)'}
                  </Typography>
                  <Typography color="textSecondary">{method.cardNumber}</Typography>
                  <Typography color="textSecondary">
                    {method.cardHolder} | Expires: {method.expiryDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                  {!method.isDefault && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleSetDefault(method.id)}
                      sx={{ mr: 1 }}
                    >
                      Set as Default
                    </Button>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCard(method.id)}
                    disabled={method.isDefault}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </List>

      <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Card Number"
              value={newCard.cardNumber}
              onChange={handleInputChange('cardNumber')}
              placeholder="1234 5678 9012 3456"
              fullWidth
            />
            <TextField
              label="Card Holder Name"
              value={newCard.cardHolder}
              onChange={handleInputChange('cardHolder')}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  value={newCard.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                  placeholder="MM/YY"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  value={newCard.cvv}
                  onChange={handleInputChange('cvv')}
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Card Type</InputLabel>
              <Select
                value={newCard.type}
                onChange={handleInputChange('type')}
                label="Card Type"
              >
                <MenuItem value="visa">Visa</MenuItem>
                <MenuItem value="mastercard">Mastercard</MenuItem>
                <MenuItem value="amex">American Express</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddCard} variant="contained">
            Add Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentMethods;
