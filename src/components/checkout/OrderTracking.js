import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  TextField,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TrackingPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
}));

const orderSteps = [
  {
    label: 'Order Confirmed',
    description: 'Your order has been confirmed and is being processed.',
    icon: InventoryIcon,
  },
  {
    label: 'Order Shipped',
    description: 'Your order has been shipped and is on its way.',
    icon: LocalShippingIcon,
  },
  {
    label: 'Order Delivered',
    description: 'Your order has been delivered successfully.',
    icon: CheckCircleIcon,
  },
];

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(1); // Mock active step

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    // Mock API call to track order
    if (orderNumber.length === 6) {
      setError('');
      setShowTracking(true);
      // In a real app, you would fetch the order status here
    } else {
      setError('Invalid order number. Please check and try again.');
    }
  };

  const getStepContent = (step) => {
    const currentDate = new Date();
    const dates = [
      new Date(currentDate.setDate(currentDate.getDate() - 2)),
      new Date(currentDate.setDate(currentDate.getDate() + 2)),
      new Date(currentDate.setDate(currentDate.getDate() + 3)),
    ];

    return {
      date: dates[step],
      ...orderSteps[step],
    };
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Track Your Order
      </Typography>
      
      <form onSubmit={handleTrackOrder}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Order Number"
            variant="outlined"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            error={!!error}
            helperText={error}
            placeholder="Enter your 6-digit order number"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ minWidth: 120 }}
          >
            Track
          </Button>
        </Box>
      </form>

      <Collapse in={showTracking}>
        <TrackingPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              Order #{orderNumber}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowTracking(false)}
              aria-label="close tracking"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Stepper activeStep={activeStep} orientation="vertical">
            {orderSteps.map((step, index) => {
              const stepContent = getStepContent(index);
              return (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={step.icon}
                    optional={
                      <Typography variant="caption">
                        {index <= activeStep && formatDate(stepContent.date)}
                      </Typography>
                    }
                  >
                    <Typography variant="subtitle1">{step.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === 1 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Estimated delivery: {formatDate(getStepContent(2).date)}
            </Alert>
          )}
        </TrackingPaper>
      </Collapse>
    </Box>
  );
};

export default OrderTracking;
