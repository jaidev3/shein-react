import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import StyleGallery from "../components/StyleGallery";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #ff4081;
  }
`;

const BannerImage = styled("img")`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CategoryCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  background-size: cover;
  border-radius: 8px 8px 0 0;
`;

const Home = () => {
  const categories = [
    {
      title: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
      link: "/women",
    },
    {
      title: "Men's Collection",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1000",
      link: "/men",
    },
    {
      title: "Beauty & Cosmetics",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000",
      link: "/beauty",
    },
    {
      title: "Home & Living",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000",
      link: "/home",
    },
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Floral Print Maxi Dress",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000",
      rating: 4.5,
      reviewCount: 128,
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      price: 45.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=1000",
      rating: 4.8,
      reviewCount: 85,
    },
    {
      id: 3,
      name: "High-Waist Skinny Jeans",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000",
      rating: 4.3,
      reviewCount: 246,
    },
    {
      id: 4,
      name: "Oversized Knit Sweater",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
      rating: 4.6,
      reviewCount: 167,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* <Box component="section" sx={{ mb: 6 }}>
        <Link to="/women">
          <BannerImage src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000" alt="Women's Fashion" />
        </Link>
      </Box> */}

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: "center", color: "#3f51b5" }}>
          Shop By Category
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 4 }}>
          {categories.map((category, index) => (
            <Box key={index}>
              <StyledLink to={category.link}>
                <CategoryCard>
                  <StyledCardMedia image={category.image} title={category.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      {category.title}
                    </Typography>
                  </CardContent>
                </CategoryCard>
              </StyledLink>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: "center", color: "#3f51b5" }}>
          New Arrivals
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 3 }}>
          {newArrivals.map((product) => (
            <Box
              key={product.id}
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "center", color: "#3f51b5" }}>
          Style Gallery
        </Typography>
        <StyleGallery />
      </Box>
    </Container>
  );
};

export default Home;
