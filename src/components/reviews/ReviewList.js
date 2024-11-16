import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Button,
  Grid,
  Chip,
  ImageList,
  ImageListItem,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  CheckCircle as VerifiedIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const ReviewList = ({ reviews, onHelpfulClick }) => {
  const renderReviewImages = (images) => {
    if (!images || images.length === 0) return null;

    return (
      <ImageList sx={{ width: '100%', maxWidth: 500, mt: 2 }} cols={3} rowHeight={164}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`Review image ${index + 1}`}
              loading="lazy"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  return (
    <Box>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Review Header */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {review.author[0]}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        {review.author}
                      </Typography>
                      {review.verified && (
                        <Tooltip title="Verified Purchase">
                          <VerifiedIcon color="primary" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(review.date), 'MMM d, yyyy')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Rating and Title */}
              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Rating value={review.rating} readOnly precision={0.5} />
                  <Typography variant="h6" gutterBottom>
                    {review.title}
                  </Typography>
                </Box>
              </Grid>

              {/* Product Details */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip
                    label={`Size: ${review.size}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`Color: ${review.color}`}
                    size="small"
                    variant="outlined"
                  />
                  {review.height && (
                    <Chip
                      label={`Height: ${review.height}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {review.weight && (
                    <Chip
                      label={`Weight: ${review.weight}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Grid>

              {/* Review Content */}
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  {review.comment}
                </Typography>
                {renderReviewImages(review.images)}
              </Grid>

              {/* Review Actions */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Button
                    startIcon={<ThumbUpIcon />}
                    onClick={() => onHelpfulClick(review.id)}
                    size="small"
                  >
                    Helpful ({review.helpful})
                  </Button>
                  <IconButton
                    size="small"
                    color="default"
                    aria-label="Report review"
                  >
                    <FlagIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewList;
