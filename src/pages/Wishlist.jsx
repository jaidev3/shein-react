import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!user) {
    return (
      <>
        {/* <Navigation /> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh'
          }}>
            <Typography variant="h5" gutterBottom>
              Please sign in to view your wishlist
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/signin')}
              sx={{ 
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  if (wishlist.length === 0) {
    return (
      <>
        {/* <Navigation /> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh'
          }}>
            <Typography variant="h5" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ 
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            mb: 4
          }}
        >
          My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'center'
        }}>
          {wishlist.map((product) => (
            <Box 
              key={product.id}
              sx={{
                flexBasis: {
                  xs: '100%',
                  sm: 'calc(50% - 32px)',
                  md: 'calc(33.333% - 32px)',
                }
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={`https://source.unsplash.com/random/400x400?${product.category}`}
                    alt={product.name}
                    sx={{
                      height: 300,
                      objectFit: 'cover',
                      borderRadius: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 2 
                  }}>
                    <Typography variant="h6" color="primary" fontWeight="600">
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body1"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    fullWidth
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      borderRadius: 2,
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Wishlist;
