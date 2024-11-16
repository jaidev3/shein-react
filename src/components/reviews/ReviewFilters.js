import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Rating,
  Button,
  Popover,
  Typography,
  Divider,
} from '@mui/material';
import { PhotoCamera, VerifiedUser } from '@mui/icons-material';

const ReviewFilters = ({ filters, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleRatingClick = (rating) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 'all' : rating,
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'review-filters-popover' : undefined;

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        Filters
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 3, width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Filter Reviews
          </Typography>

          {/* Rating Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Rating
            </Typography>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                variant={filters.rating === rating ? 'contained' : 'outlined'}
                size="small"
                sx={{ mr: 1, mb: 1 }}
                startIcon={<Rating value={rating} readOnly size="small" />}
              >
                {rating} Stars
              </Button>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Verified Purchases Filter */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.verified}
                onChange={handleFilterChange('verified')}
                icon={<VerifiedUser />}
                checkedIcon={<VerifiedUser />}
              />
            }
            label="Verified Purchases Only"
            sx={{ mb: 2, display: 'block' }}
          />

          {/* With Photos Filter */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.withPhotos}
                onChange={handleFilterChange('withPhotos')}
                icon={<PhotoCamera />}
                checkedIcon={<PhotoCamera />}
              />
            }
            label="With Photos Only"
            sx={{ mb: 2, display: 'block' }}
          />

          {/* Size Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={filters.size}
              onChange={handleFilterChange('size')}
              label="Size"
            >
              <MenuItem value="all">All Sizes</MenuItem>
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="XXL">XXL</MenuItem>
            </Select>
          </FormControl>

          {/* Color Filter */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={filters.color}
              onChange={handleFilterChange('color')}
              label="Color"
            >
              <MenuItem value="all">All Colors</MenuItem>
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Green">Green</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
              <MenuItem value="Pink">Pink</MenuItem>
              <MenuItem value="Purple">Purple</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button
              onClick={() => {
                onFilterChange({
                  rating: 'all',
                  verified: false,
                  withPhotos: false,
                  size: 'all',
                  color: 'all'
                });
                handleClose();
              }}
            >
              Clear All
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ReviewFilters;
