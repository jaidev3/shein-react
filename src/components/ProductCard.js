import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  height: 100%;
`;

const ProductImage = styled(CardMedia)`
  padding-top: 133.33%; // 4:3 aspect ratio
  position: relative;
`;

const PriceText = styled(Typography)`
  font-weight: bold;
  color: #ff4081;
`;

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount
  } = product;

  return (
    <StyledLink to={`/product/${id}`}>
      <StyledCard>
        <ProductImage
          image={image}
          title={name}
        />
        <CardContent>
          <Typography variant="subtitle1" component="h3" noWrap>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <PriceText variant="body1">
              ${price.toFixed(2)}
            </PriceText>
            {originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ${originalPrice.toFixed(2)}
              </Typography>
            )}
          </Box>
          {rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating value={rating} readOnly size="small" />
              {reviewCount && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({reviewCount})
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </StyledCard>
    </StyledLink>
  );
};

export default ProductCard;
