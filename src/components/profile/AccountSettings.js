import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  NotificationsActive as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  CreditCard as CreditCardIcon,
  LocalShipping as ShippingIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: true,
    newsletter: true,
    twoFactorAuth: false,
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSettingChange = (setting) => (event) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: event.target.checked,
    }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handlePasswordSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    // Here you would typically make an API call to change the password
    console.log('Changing password...');
    setOpenPasswordDialog(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={handleSettingChange('emailNotifications')}
            />
          }
          label="Email Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.pushNotifications}
              onChange={handleSettingChange('pushNotifications')}
            />
          }
          label="Push Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.orderUpdates}
              onChange={handleSettingChange('orderUpdates')}
            />
          }
          label="Order Updates"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.promotions}
              onChange={handleSettingChange('promotions')}
            />
          }
          label="Promotional Emails"
        />
        <FormControlLabel
          control={
            <Switch
              checked={settings.newsletter}
              onChange={handleSettingChange('newsletter')}
            />
          }
          label="Newsletter Subscription"
        />
      </FormGroup>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Security Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText
            primary="Two-Factor Authentication"
            secondary="Add an extra layer of security to your account"
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={settings.twoFactorAuth}
              onChange={handleSettingChange('twoFactorAuth')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText
            primary="Change Password"
            secondary="Update your account password"
          />
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenPasswordDialog(true)}
            >
              Change
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Connected Accounts
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Payment Methods"
            secondary="Manage your saved payment methods"
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" size="small">
              Manage
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ShippingIcon />
          </ListItemIcon>
          <ListItemText
            primary="Shipping Addresses"
            secondary="Manage your shipping addresses"
          />
          <ListItemSecondaryAction>
            <Button variant="outlined" size="small">
              Manage
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange('currentPassword')}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange('newPassword')}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordSubmit} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountSettings;
