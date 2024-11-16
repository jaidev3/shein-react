import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard';
import Navigation from '../components/Navigation';

const categories = [
  'Dresses',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Accessories',
  'Shoes',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Yellow', value: '#FFFF00' },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 200],
    onSale: false,
    inStock: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Floral Summer Dress',
      price: 49.99,
      image: '/images/dress1.jpg',
      category: 'Dresses',
      colors: ['Red', 'Blue'],
      sizes: ['S', 'M', 'L'],
      onSale: true,
      inStock: true,
      rating: 4.5,
      reviews: 128,
    },
    // Add more mock products here
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (type) {
        case 'categories':
        case 'sizes':
        case 'colors':
          if (newFilters[type].includes(value)) {
            newFilters[type] = newFilters[type].filter(item => item !== value);
          } else {
            newFilters[type] = [...newFilters[type], value];
          }
          break;
        case 'priceRange':
          newFilters.priceRange = value;
          break;
        case 'onSale':
        case 'inStock':
          newFilters[type] = value;
          break;
        default:
          break;
      }
      
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 200],
      onSale: false,
      inStock: true,
    });
  };

  const FilterContent = () => (
    <Box sx={{ p: 3, width: isMobile ? 'auto' : 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" onClick={clearFilters}>Clear All</Button>
      </Box>

      <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
      <Slider
        value={filters.priceRange}
        onChange={(_, value) => handleFilterChange('priceRange', value)}
        valueLabelDisplay="auto"
        min={0}
        max={200}
        sx={{ mb: 4 }}
      />

      <Typography variant="subtitle1" gutterBottom>Categories</Typography>
      <FormGroup sx={{ mb: 3 }}>
        {categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={filters.categories.includes(category)}
                onChange={() => handleFilterChange('categories', category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle1" gutterBottom>Sizes</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {sizes.map(size => (
          <Chip
            key={size}
            label={size}
            onClick={() => handleFilterChange('sizes', size)}
            color={filters.sizes.includes(size) ? 'primary' : 'default'}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>

      <Typography variant="subtitle1" gutterBottom>Colors</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {colors.map(color => (
          <Box
            key={color.name}
            onClick={() => handleFilterChange('colors', color.name)}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: color.value,
              border: `2px solid ${filters.colors.includes(color.name) ? theme.palette.primary.main : '#ddd'}`,
              borderRadius: '50%',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          />
        ))}
      </Box>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.onSale}
              onChange={(e) => handleFilterChange('onSale', e.target.checked)}
            />
          }
          label="On Sale"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            />
          }
          label="In Stock"
        />
      </FormGroup>
    </Box>
  );

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Paper>

        <Grid container spacing={3}>
          {/* Filters */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Paper>
                <FilterContent />
              </Paper>
            </Grid>
          )}

          {/* Products */}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {loading ? 'Searching...' : `${products.length} Results`}
              </Typography>
              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <FilterListIcon />
                </IconButton>
              )}
            </Box>

            <Grid container spacing={2}>
              {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Mobile Filters Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterContent />
        </Drawer>
      </Container>
    </>
  );
};

export default SearchResults;
