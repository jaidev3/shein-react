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
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const ShippingAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Office',
      street: '456 Business Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States',
      phone: '(555) 987-6543',
      isDefault: false,
    },
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });
  const [error, setError] = useState('');

  const handleAddAddress = () => {
    // Basic validation
    if (
      !newAddress.name ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode ||
      !newAddress.country ||
      !newAddress.phone
    ) {
      setError('All fields are required');
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(newAddress.phone)) {
      setError('Invalid phone number format. Use (XXX) XXX-XXXX');
      return;
    }

    // Zip code validation (basic US format)
    if (!/^\d{5}(-\d{4})?$/.test(newAddress.zipCode)) {
      setError('Invalid ZIP code');
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? {
                ...newAddress,
                id: addr.id,
                isDefault: newAddress.isDefault ? true : addr.isDefault,
              }
            : {
                ...addr,
                isDefault: newAddress.isDefault ? false : addr.isDefault,
              }
        )
      );
    } else {
      // Add new address
      const address = {
        ...newAddress,
        id: Date.now(),
        isDefault: newAddress.isDefault || addresses.length === 0,
      };

      if (address.isDefault) {
        setAddresses(
          addresses.map((addr) => ({
            ...addr,
            isDefault: false,
          }))
        );
      }

      setAddresses([...addresses, address]);
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setEditingAddress(null);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false,
    });
    setError('');
  };

  const handleDeleteAddress = (id) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    if (addressToDelete.isDefault && addresses.length > 1) {
      // If deleting default address, set another address as default
      const newAddresses = addresses.filter((addr) => addr.id !== id);
      newAddresses[0].isDefault = true;
      setAddresses(newAddresses);
    } else {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setOpenAddDialog(true);
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleInputChange = (field) => (event) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: field === 'isDefault' ? event.target.checked : event.target.value,
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Shipping Addresses</Typography>
        <Button
          variant="contained"
          startIcon={<LocationIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} md={6} key={address.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {address.name} {address.isDefault && '(Default)'}
                  </Typography>
                  <Box>
                    {!address.isDefault && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleSetDefault(address.id)}
                        sx={{ mr: 1 }}
                      >
                        Set as Default
                      </Button>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleEditAddress(address)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={address.isDefault && addresses.length > 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">{address.street}</Typography>
                <Typography color="textSecondary">
                  {address.city}, {address.state} {address.zipCode}
                </Typography>
                <Typography color="textSecondary">{address.country}</Typography>
                <Typography color="textSecondary">{address.phone}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Edit Shipping Address' : 'Add New Shipping Address'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Address Name"
              value={newAddress.name}
              onChange={handleInputChange('name')}
              placeholder="e.g., Home, Office"
              fullWidth
            />
            <TextField
              label="Street Address"
              value={newAddress.street}
              onChange={handleInputChange('street')}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  value={newAddress.city}
                  onChange={handleInputChange('city')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  value={newAddress.state}
                  onChange={handleInputChange('state')}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ZIP Code"
                  value={newAddress.zipCode}
                  onChange={handleInputChange('zipCode')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  value={newAddress.country}
                  onChange={handleInputChange('country')}
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              label="Phone Number"
              value={newAddress.phone}
              onChange={handleInputChange('phone')}
              placeholder="(XXX) XXX-XXXX"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAddress.isDefault}
                  onChange={handleInputChange('isDefault')}
                />
              }
              label="Set as default shipping address"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddAddress} variant="contained">
            {editingAddress ? 'Save Changes' : 'Add Address'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShippingAddresses;
