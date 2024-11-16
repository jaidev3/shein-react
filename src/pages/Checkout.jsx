import React, { useState, useContext } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useNavigate } from 'react-router-dom';
// import Navigation from '../components/Navigation';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    handleNext();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    handleNext();
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Mock API call to process order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      clearCart();
      navigate('/order-confirmation', { 
        state: { orderNumber }
      });
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShippingForm onSubmit={handleShippingSubmit} />;
      case 1:
        return <PaymentForm onSubmit={handlePaymentSubmit} />;
      case 2:
        return (
          <OrderSummary
            cart={cart}
            total={total}
            shipping={shippingData}
            payment={paymentData}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  if (cart.length === 0) {
    return (
      <>
        {/* <Navigation /> */}
        <Container maxWidth="lg">
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>

      <Dialog open={isProcessing} disableEscapeKeyDown>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={48} sx={{ mb: 2 }} />
          <Typography>Processing your order...</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
