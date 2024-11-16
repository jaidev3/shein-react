import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const ReviewForm = ({ open, onClose, onSubmit, productId }) => {
  const [review, setReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    size: '',
    color: '',
    height: '',
    weight: '',
    images: [],
    recommend: true,
  });

  const [errors, setErrors] = useState({});
  const [hoveredRating, setHoveredRating] = useState(-1);
  const [uploadError, setUploadError] = useState('');

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setReview((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Validate file size and type
    const invalidFiles = files.filter(
      file => !file.type.startsWith('image/') || file.size > 5 * 1024 * 1024
    );

    if (invalidFiles.length > 0) {
      setUploadError('Please upload only images under 5MB');
      return;
    }

    // Limit to 5 images
    if (review.images.length + files.length > 5) {
      setUploadError('Maximum 5 images allowed');
      return;
    }

    setUploadError('');

    // Convert files to URLs
    const newImages = files.map(file => URL.createObjectURL(file));
    setReview(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setReview(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!review.rating) {
      newErrors.rating = 'Please select a rating';
    }
    if (!review.title.trim()) {
      newErrors.title = 'Please enter a title';
    }
    if (!review.comment.trim()) {
      newErrors.comment = 'Please enter a review';
    } else if (review.comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters long';
    }
    if (!review.size) {
      newErrors.size = 'Please select a size';
    }
    if (!review.color) {
      newErrors.color = 'Please select a color';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(review);
      handleClose();
    }
  };

  const handleClose = () => {
    setReview({
      rating: 0,
      title: '',
      comment: '',
      size: '',
      color: '',
      height: '',
      weight: '',
      images: [],
      recommend: true,
    });
    setErrors({});
    setUploadError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Write a Review
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography component="legend" gutterBottom>
            Overall Rating*
          </Typography>
          <Rating
            value={review.rating}
            onChange={(event, newValue) => {
              handleInputChange('rating')({ target: { value: newValue } });
            }}
            onChangeActive={(event, newHover) => {
              setHoveredRating(newHover);
            }}
            size="large"
          />
          {review.rating !== null && (
            <Typography sx={{ ml: 2 }}>
              {ratingLabels[hoveredRating !== -1 ? hoveredRating : review.rating]}
            </Typography>
          )}
          {errors.rating && (
            <Typography color="error" variant="caption">
              {errors.rating}
            </Typography>
          )}
        </Box>

        <TextField
          label="Review Title*"
          value={review.title}
          onChange={handleInputChange('title')}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Your Review*"
          value={review.comment}
          onChange={handleInputChange('comment')}
          multiline
          rows={4}
          fullWidth
          error={!!errors.comment}
          helperText={errors.comment}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.size}>
              <InputLabel>Size*</InputLabel>
              <Select
                value={review.size}
                onChange={handleInputChange('size')}
                label="Size*"
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
              {errors.size && (
                <Typography color="error" variant="caption">
                  {errors.size}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.color}>
              <InputLabel>Color*</InputLabel>
              <Select
                value={review.color}
                onChange={handleInputChange('color')}
                label="Color*"
              >
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
                <MenuItem value="Yellow">Yellow</MenuItem>
                <MenuItem value="Pink">Pink</MenuItem>
                <MenuItem value="Purple">Purple</MenuItem>
              </Select>
              {errors.color && (
                <Typography color="error" variant="caption">
                  {errors.color}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (optional)"
              value={review.height}
              onChange={handleInputChange('height')}
              placeholder="e.g., 5'6\""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight (optional)"
              value={review.weight}
              onChange={handleInputChange('weight')}
              placeholder="e.g., 130 lbs"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Add Photos (optional)
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="review-image-upload"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="review-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
            >
              Upload Photos
            </Button>
          </label>
          {uploadError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {uploadError}
            </Alert>
          )}
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {review.images.map((image, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                  }}
                >
                  <img
                    src={image}
                    alt={`Review ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={review.recommend}
              onChange={handleInputChange('recommend')}
            />
          }
          label="I recommend this product"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;
