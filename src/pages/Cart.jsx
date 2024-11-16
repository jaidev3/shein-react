import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import Navigation from '../components/Navigation';
import { useCart } from '../context/CartContext';

const CartItemCard = styled(Card)`
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
`;

const ItemImage = styled(CardMedia)`
  width: 120px;
  height: 160px;
`;

const SummaryCard = styled(Card)`
  padding: 24px;
  height: fit-content;
`;

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <>
        {/* <Navigation /> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart ({getCartItemsCount()} items)
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <CartItemCard key={`${item.id}-${item.size}`}>
                <ItemImage
                  image={item.image}
                  title={item.name}
                  component={RouterLink}
                  to={`/product/${item.id}`}
                  sx={{ cursor: 'pointer' }}
                />
                <Box sx={{ flex: 1, ml: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Link
                        component={RouterLink}
                        to={`/product/${item.id}`}
                        color="inherit"
                        underline="hover"
                      >
                        <Typography variant="h6">{item.name}</Typography>
                      </Link>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Size: {item.size}
                      </Typography>
                    </div>
                    <IconButton
                      onClick={() => removeFromCart(item.id, item.size)}
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <Select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, item.size, e.target.value)
                      }
                      size="small"
                      sx={{ width: 80 }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="h6">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CartItemCard>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <SummaryCard>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${getCartTotal().toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${getCartTotal().toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={RouterLink}
                to="/checkout"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                fullWidth
                component={RouterLink}
                to="/"
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </SummaryCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
