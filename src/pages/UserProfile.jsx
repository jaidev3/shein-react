import React, { useState } from "react";
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
  Card,
  CardContent,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";

const TabPanel = ({ children, value, index }) => <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
}));

const OrderStatus = styled(Chip)(({ status }) => {
  const colors = {
    pending: "#ff9800",
    processing: "#2196f3",
    shipped: "#4caf50",
    delivered: "#00c853",
    cancelled: "#f44336",
  };
  return {
    backgroundColor: colors[status] || colors.pending,
    color: "#fff",
    fontWeight: "bold",
  };
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
  });

  const orderHistory = [
    {
      id: "ORD123456",
      date: "2023-05-20",
      total: 129.99,
      status: "delivered",
      items: [
        { name: "Floral Maxi Dress", quantity: 1, price: 89.99 },
        { name: "Denim Jacket", quantity: 1, price: 40.0 },
      ],
    },
    {
      id: "ORD123457",
      date: "2023-05-15",
      total: 79.99,
      status: "processing",
      items: [{ name: "Summer Blouse", quantity: 2, price: 39.99 }],
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
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, textAlign: "center" }} elevation={2}>
                <ProfileAvatar>
                  <PersonIcon sx={{ fontSize: 48 }} />
                </ProfileAvatar>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Member since {new Date(user?.createdAt).getFullYear()}
                </Typography>
                <Button variant="contained" startIcon={isEditing ? <SaveIcon /> : <EditIcon />} onClick={() => setIsEditing(!isEditing)} sx={{ mt: 2, width: "100%" }}>
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </Paper>

              <Paper sx={{ p: 2 }} elevation={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Quick Stats
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                    <Typography variant="h6">{orderHistory.length}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Active Orders
                    </Typography>
                    <Typography variant="h6">{orderHistory.filter((order) => order.status === "processing").length}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ mb: 3 }} elevation={2}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    py: 2,
                  },
                }}
              >
                <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                <Tab icon={<LocalShippingIcon />} label="Orders" iconPosition="start" />
                <Tab icon={<SettingsIcon />} label="Preferences" iconPosition="start" />
              </Tabs>

              {/* Profile Details Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Last Name" name="lastName" value={profileData.lastName} onChange={handleInputChange} disabled={!isEditing} variant="outlined" />
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
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Phone" name="phone" value={profileData.phone} onChange={handleInputChange} disabled={!isEditing} variant="outlined" />
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
                        rows={3}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="City" name="city" value={profileData.city} onChange={handleInputChange} disabled={!isEditing} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField fullWidth label="State" name="state" value={profileData.state} onChange={handleInputChange} disabled={!isEditing} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField fullWidth label="ZIP Code" name="zipCode" value={profileData.zipCode} onChange={handleInputChange} disabled={!isEditing} variant="outlined" />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Order History Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {orderHistory.map((order) => (
                      <Grid item xs={12} key={order.id}>
                        <StyledCard>
                          <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                              <Typography variant="h6">Order #{order.id}</Typography>
                              <OrderStatus label={order.status.toUpperCase()} status={order.status} />
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            {order.items.map((item, index) => (
                              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography variant="body2">
                                  {item.name} (x{item.quantity})
                                </Typography>
                                <Typography variant="body2">${item.price.toFixed(2)}</Typography>
                              </Box>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Total
                              </Typography>
                              <Typography variant="subtitle1" fontWeight="bold">
                                ${order.total.toFixed(2)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </StyledCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Communication Preferences
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Order Updates" />
                    <FormControlLabel control={<Switch />} label="Promotional Emails" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Newsletter Subscription" />
                  </Stack>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfile;
