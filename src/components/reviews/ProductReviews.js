import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import ReviewFilters from './ReviewFilters';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      title: "Perfect fit and great quality!",
      comment: "I absolutely love this piece! The fabric quality is excellent, and it fits true to size. Highly recommend!",
      author: "Sarah M.",
      date: "2024-01-15",
      verified: true,
      helpful: 24,
      images: [
        "https://example.com/review-image1.jpg",
        "https://example.com/review-image2.jpg"
      ],
      size: "M",
      color: "Black",
      height: "5'6\"",
      weight: "130 lbs"
    },
    // Add more mock reviews here
  ]);

  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    rating: 'all',
    verified: false,
    withPhotos: false,
    size: 'all',
    color: 'all'
  });

  // Calculate rating statistics
  const ratingStats = {
    average: 4.5,
    total: reviews.length,
    distribution: {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2
    },
    recommendationRate: 92
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddReview = (newReview) => {
    setReviews([
      {
        id: Date.now(),
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
      },
      ...reviews
    ]);
    setOpenReviewForm(false);
  };

  const handleHelpfulClick = (reviewId) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Reviews Summary */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              {ratingStats.average}
            </Typography>
            <Rating value={ratingStats.average} precision={0.5} readOnly size="large" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Based on {ratingStats.total} reviews
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpenReviewForm(true)}
            >
              Write a Review
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Box
                key={rating}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}
              >
                <Typography component="span">{rating} stars</Typography>
                <LinearProgress
                  variant="determinate"
                  value={ratingStats.distribution[rating]}
                  sx={{ flexGrow: 1 }}
                />
                <Typography component="span">
                  {ratingStats.distribution[rating]}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Buyer Feedback
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                {ratingStats.recommendationRate}% of customers recommend this product
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Fit: True to Size
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Length: As Expected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quality: Excellent
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Filters and Sort */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <ReviewFilters filters={filters} onFilterChange={handleFilterChange} />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="highest">Highest Rated</MenuItem>
            <MenuItem value="lowest">Lowest Rated</MenuItem>
            <MenuItem value="helpful">Most Helpful</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Review List */}
      <ReviewList
        reviews={reviews}
        onHelpfulClick={handleHelpfulClick}
      />

      {/* Review Form Dialog */}
      <ReviewForm
        open={openReviewForm}
        onClose={() => setOpenReviewForm(false)}
        onSubmit={handleAddReview}
        productId={productId}
      />
    </Box>
  );
};

export default ProductReviews;
