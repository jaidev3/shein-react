import React from 'react';
import { Container, Paper, Typography, Button, Box, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OrderTracking from '../components/checkout/OrderTracking';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || Math.floor(100000 + Math.random() * 900000);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          sx={{
            p: { xs: 2, md: 4 },
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Thank You for Your Order!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Order #{orderNumber}
          </Typography>
          <Typography variant="body1" paragraph>
            We've received your order and will send you an email confirmation shortly.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You can track your order status using the order number above.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/account/orders')}
              sx={{ minWidth: 180 }}
            >
              View Orders
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{ minWidth: 180 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>

        <Divider sx={{ my: 4 }} />

        <OrderTracking />
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
