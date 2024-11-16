import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating,
  Chip,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ProductRecommendations = ({ title, products, type = 'grid' }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderProductCard = (product) => (
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
      <CardActionArea onClick={() => handleProductClick(product.id)}>
        {product.onSale && (
          <Chip
            icon={<LocalOfferIcon />}
            label="SALE"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div" noWrap>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {product.onSale ? (
              <>
                <Typography
                  variant="body1"
                  color="error"
                  fontWeight="bold"
                >
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
              <Typography variant="body1" fontWeight="bold">
                ${product.price}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={type === 'grid' ? 6 : 4}
            md={type === 'grid' ? 4 : 3}
          >
            {renderProductCard(product)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductRecommendations;
