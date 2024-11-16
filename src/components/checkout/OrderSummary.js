import React from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SummaryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

const OrderSummary = ({ cart, total, shipping, payment, onPlaceOrder }) => {
  const shippingCost = total >= 49 ? 0 : 4.99;
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shippingCost + tax;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={`${item.id}-${item.size}`}>
              <ListItemText
                primary={item.name}
                secondary={`Size: ${item.size} | Quantity: ${item.quantity}`}
              />
              <Typography variant="body2">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography variant="body2" gutterBottom>
          {shipping.firstName} {shipping.lastName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {shipping.address1}
        </Typography>
        {shipping.address2 && (
          <Typography variant="body2" gutterBottom>
            {shipping.address2}
          </Typography>
        )}
        <Typography variant="body2" gutterBottom>
          {shipping.city}, {shipping.state} {shipping.zip}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {shipping.country}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Phone: {shipping.phone}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        {payment.paymentMethod === 'credit' ? (
          <>
            <Typography variant="body2">Credit Card</Typography>
            <Typography variant="body2" gutterBottom>
              **** **** **** {payment.cardNumber.slice(-4)}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">PayPal</Typography>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryPaper>
          <Typography variant="h6" gutterBottom>
            Total Summary
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Subtotal" />
              <Typography variant="body2">${total.toFixed(2)}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Shipping" />
              <Typography variant="body2">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Tax (10%)" />
              <Typography variant="body2">${tax.toFixed(2)}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" component="span">
                    Total
                  </Typography>
                }
              />
              <Typography variant="h6" component="span">
                ${finalTotal.toFixed(2)}
              </Typography>
            </ListItem>
          </List>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={onPlaceOrder}
            >
              Place Order
            </Button>
          </Box>
        </SummaryPaper>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
