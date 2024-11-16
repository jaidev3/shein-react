import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from './ProductCard';

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    padding: theme.spacing(2),
  },
}));

const SortSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginBottom: theme.spacing(2),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100%',
}));

const ProductList = ({ category, products }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];
  const priceRanges = ['Under $20', '$20-$50', '$50-$100', 'Over $100'];

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const FilterContent = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Size
      </Typography>
      <List>
        {sizes.map((size) => (
          <ListItem key={size} dense>
            <Checkbox
              edge="start"
              checked={filters.size.includes(size)}
              onChange={() => handleFilterChange('size', size)}
            />
            <ListItemText primary={size} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom>
        Color
      </Typography>
      <List>
        {colors.map((color) => (
          <ListItem key={color} dense>
            <Checkbox
              edge="start"
              checked={filters.color.includes(color)}
              onChange={() => handleFilterChange('color', color)}
            />
            <ListItemText primary={color} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <List>
        {priceRanges.map((range) => (
          <ListItem key={range} dense>
            <Checkbox
              edge="start"
              checked={filters.price.includes(range)}
              onChange={() => handleFilterChange('price', range)}
            />
            <ListItemText primary={range} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Apply filters and sorting to products
  let filteredProducts = [...products];
  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    default:
      break;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <FilterListIcon />
            </IconButton>
          )}
          <SortSelect size="small">
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </SortSelect>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <FilterSection>
              <FilterContent />
            </FilterSection>
          </Grid>
        )}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={6} sm={4} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <FilterDrawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Button onClick={() => setDrawerOpen(false)}>Done</Button>
          </Box>
          <FilterContent />
        </Box>
      </FilterDrawer>
    </Container>
  );
};

export default ProductList;
