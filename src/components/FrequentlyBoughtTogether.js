import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FrequentlyBoughtTogether = ({ mainProduct, suggestedProducts }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([
    { ...mainProduct, selected: true, size: mainProduct.selectedSize },
    ...suggestedProducts.map(product => ({ ...product, selected: true, size: product.sizes[0] }))
  ]);

  const calculateTotal = () => {
    return selectedProducts
      .filter(product => product.selected)
      .reduce((total, product) => {
        const price = product.salePrice || product.price;
        return total + price;
      }, 0);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleAddAllToCart = () => {
    selectedProducts.forEach(product => {
      if (product.selected) {
        addToCart(product, product.size, 1);
      }
    });
    navigate('/cart');
  };

  const ProductCard = ({ product, isMain }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardMedia
        component="img"
        height={150}
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={() => !isMain && navigate(`/product/${product.id}`)}
      />
      <CardContent>
        <Typography variant="subtitle2" noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          {product.salePrice ? (
            <>
              <Typography variant="body2" color="error" fontWeight="bold">
                ${product.salePrice}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.price}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" fontWeight="bold">
              ${product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Frequently Bought Together
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3, overflowX: 'auto', pb: 2 }}>
        {selectedProducts.map((product, index) => (
          <React.Fragment key={product.id}>
            {index > 0 && (
              <IconButton size="small" sx={{ flexShrink: 0 }}>
                <AddIcon />
              </IconButton>
            )}
            <Box sx={{ width: 200, flexShrink: 0 }}>
              <ProductCard product={product} isMain={index === 0} />
            </Box>
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {selectedProducts.map((product, index) => (
          <FormControlLabel
            key={product.id}
            control={
              <Checkbox
                checked={product.selected}
                onChange={() => handleProductSelect(product.id)}
                disabled={index === 0} // Main product cannot be deselected
              />
            }
            label={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography>
                  {product.name} - Size {product.size}
                </Typography>
                <Typography fontWeight="bold">
                  ${product.salePrice || product.price}
                </Typography>
              </Box>
            }
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box>
          <Typography variant="subtitle1">Total Price:</Typography>
          <Typography variant="h6" color="primary">
            ${calculateTotal().toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddAllToCart}
          sx={{ minWidth: 200 }}
        >
          Add Selected to Cart
        </Button>
      </Box>
    </Paper>
  );
};

export default FrequentlyBoughtTogether;
