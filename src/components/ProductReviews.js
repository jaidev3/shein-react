import React, { useState } from "react";
import { Box, Typography, Rating, LinearProgress, Button, Avatar, Divider, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";

const RatingBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
});

const ProgressBar = styled(LinearProgress)({
  flex: 1,
  marginLeft: 16,
  marginRight: 8,
  height: 8,
  borderRadius: 4,
});

const ReviewBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

const ProductReviews = ({ productId, initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [openDialog, setOpenDialog] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const { user } = useAuth();

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

  const handleSubmitReview = () => {
    if (!newReview.rating || !newReview.comment.trim()) {
      return;
    }

    const review = {
      id: Date.now(),
      userId: user?.id || "anonymous",
      userName: user?.name || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
    setOpenDialog(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {averageRating}
          </Typography>
          <Rating value={Number(averageRating)} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            Based on {reviews.length} reviews
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} disabled={!user}>
          Write a Review
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <RatingBar key={rating}>
            <Typography variant="body2" sx={{ minWidth: 60 }}>
              {rating} stars
            </Typography>
            <ProgressBar variant="determinate" value={((ratingCounts[rating] || 0) / reviews.length) * 100 || 0} />
            <Typography variant="body2" sx={{ minWidth: 40 }}>
              {ratingCounts[rating] || 0}
            </Typography>
          </RatingBar>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {reviews.map((review) => (
        <ReviewBox key={review.id}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{review.userName}</Typography>
              <Rating value={review.rating} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(review.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" paragraph>
                {review.comment}
              </Typography>
              <Button size="small" onClick={() => handleHelpful(review.id)} sx={{ mr: 1 }}>
                Helpful ({review.helpful})
              </Button>
            </Grid>
          </Grid>
        </ReviewBox>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating value={newReview.rating} onChange={(event, value) => setNewReview({ ...newReview, rating: value })} />
          </Box>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitReview} variant="contained">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductReviews;
