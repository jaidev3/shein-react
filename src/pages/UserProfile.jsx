import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const OrderStatus = styled(Chip)(({ status }) => {
  const colors = {
    pending: '#ffa726',
    processing: '#29b6f6',
    shipped: '#66bb6a',
    delivered: '#43a047',
    cancelled: '#ef5350',
  };
  return {
    backgroundColor: colors[status] || colors.pending,
    color: '#fff',
  };
});

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
  });

  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD123456',
      date: '2023-05-20',
      total: 129.99,
      status: 'delivered',
      items: [
        { name: 'Floral Maxi Dress', quantity: 1, price: 89.99 },
        { name: 'Denim Jacket', quantity: 1, price: 40.00 },
      ],
    },
    {
      id: 'ORD123457',
      date: '2023-05-15',
      total: 79.99,
      status: 'processing',
      items: [
        { name: 'Summer Blouse', quantity: 2, price: 39.99 },
      ],
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <ProfileAvatar>
                <PersonIcon sx={{ fontSize: 48 }} />
              </ProfileAvatar>
              <Typography variant="h5" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member since {new Date(user?.createdAt).getFullYear()}
              </Typography>
              <Button
                variant="outlined"
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{ mt: 2 }}
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Profile Details" />
                <Tab label="Order History" />
                <Tab label="Preferences" />
              </Tabs>

              {/* Profile Details Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={profileData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="ZIP Code"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
                {isEditing && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* Order History Tab */}
              <TabPanel value={tabValue} index={1}>
                <List>
                  {orderHistory.map((order, index) => (
                    <React.Fragment key={order.id}>
                      {index > 0 && <Divider />}
                      <ListItem
                        alignItems="flex-start"
                        sx={{ flexDirection: 'column' }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1">
                            Order #{order.id}
                          </Typography>
                          <OrderStatus
                            label={order.status.toUpperCase()}
                            status={order.status}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        <List sx={{ width: '100%' }}>
                          {order.items.map((item, itemIndex) => (
                            <ListItem key={itemIndex}>
                              <ListItemText
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity} | $${item.price}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1,
                          }}
                        >
                          <Typography variant="subtitle2">Total:</Typography>
                          <Typography variant="subtitle2">
                            ${order.total.toFixed(2)}
                          </Typography>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Communication Preferences
                </Typography>
                {/* Add preferences content here */}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
