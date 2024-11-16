import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import StyleGallery from '../components/StyleGallery';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const BannerImage = styled('img')`
  width: 100%;
  height: auto;
  display: block;
`;

const CategoryCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  background-size: cover;
`;

const Home = () => {
  const categories = [
    {
      title: "Women's Fashion",
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      link: "/women"
    },
    {
      title: "Men's Collection",
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      link: "/men"
    },
    {
      title: "Beauty & Cosmetics",
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      link: "/beauty"
    },
    {
      title: "Home & Living",
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      link: "/home"
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Floral Print Maxi Dress",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      price: 45.99,
      originalPrice: 59.99,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      rating: 4.8,
      reviewCount: 85
    },
    {
      id: 3,
      name: "High-Waist Skinny Jeans",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      rating: 4.3,
      reviewCount: 246
    },
    {
      id: 4,
      name: "Oversized Knit Sweater",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      rating: 4.6,
      reviewCount: 167
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box component="section" sx={{ mb: 6 }}>
        <Link to="/women">
          <BannerImage 
            src="https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp"
            alt="Women's Fashion"
          />
        </Link>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Shop By Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledLink to={category.link}>
                <CategoryCard>
                  <StyledCardMedia
                    image={category.image}
                    title={category.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      {category.title}
                    </Typography>
                  </CardContent>
                </CategoryCard>
              </StyledLink>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          New Arrivals
        </Typography>
        <Grid container spacing={3}>
          {newArrivals.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Style Gallery
        </Typography>
        <StyleGallery />
      </Box>
    </Container>
  );
};

export default Home;
