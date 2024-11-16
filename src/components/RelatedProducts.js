import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ProductCard = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    '& img': {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease-in-out',
    },
  },
}));

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
});

const PriceText = styled(Typography)({
  color: '#ff4081',
  fontWeight: 'bold',
});

const RelatedProducts = ({ products, currentProductId }) => {
  const navigate = useNavigate();

  // Filter out the current product and take only 4 related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        You May Also Like
      </Typography>
      <Grid container spacing={3}>
        {relatedProducts.map((product) => (
          <Grid item xs={6} sm={3} key={product.id}>
            <ProductCard onClick={() => handleProductClick(product.id)}>
              <Box sx={{ mb: 2, overflow: 'hidden' }}>
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  mb: 1,
                }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PriceText variant="body1">${product.price}</PriceText>
                {product.originalPrice && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', color: '#666' }}
                  >
                    ${product.originalPrice}
                  </Typography>
                )}
              </Box>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
