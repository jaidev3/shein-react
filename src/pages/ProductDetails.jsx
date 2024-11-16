import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { Container, Grid, Typography, Box, Button, Rating, Tabs, Tab, Select, MenuItem, FormControl, InputLabel, Breadcrumbs, Link, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StraightenIcon from "@mui/icons-material/Straighten";
import Navigation from "../components/Navigation";
import SizeGuide from "../components/SizeGuide";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import ProductRecommendations from "../components/ProductRecommendations";
import SizeRecommendation from "../components/SizeRecommendation";

const ProductImage = styled("img")`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ThumbnailImage = styled("img")`
  width: 80px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#000" : "transparent")};
  &:hover {
    border-color: #666;
  }
`;

const PriceText = styled(Typography)`
  color: #ff4081;
  font-weight: bold;
`;

const SizeButton = styled(Button)`
  min-width: 60px;
  margin: 0 8px 8px 0;
  border-color: ${(props) => (props.selected ? "#000" : "#ddd")};
  color: ${(props) => (props.selected ? "#000" : "#666")};
  &:hover {
    border-color: #000;
  }
`;

const TabPanel = ({ children, value, index }) => <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  // Move product data declaration here, before the hooks
  const product = useMemo(() => {
    return {
      id,
      name: "Floral Print Maxi Dress",
      price: 29.99,
      originalPrice: 39.99,
      description: "Beautiful floral print maxi dress perfect for summer occasions.",
      rating: 4.5,
      reviewCount: 128,
      images: [
        "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
        "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
        "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
        "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      details: ["Material: 100% Polyester", "Length: Maxi", "Pattern Type: Floral", "Season: Summer", "Style: Casual"],
      category: "Dresses",
    };
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [showSizeRecommendation, setShowSizeRecommendation] = useState(false);

  useEffect(() => {
    setIsInWishlistState(isInWishlist(id));
  }, [id, isInWishlist]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  const handleWishlistClick = () => {
    if (isInWishlistState) {
      removeFromWishlist(id);
      setIsInWishlistState(false);
    } else {
      const added = addToWishlist(product);
      if (added) {
        setIsInWishlistState(true);
      } else {
        // Handle case where user is not logged in
        navigate("/signin");
      }
    }
  };

  // Mock recommended products data
  const recommendedProducts = [
    {
      id: 2,
      name: "Striped Summer Dress",
      price: 59.99,
      salePrice: 49.99,
      image: "/images/dress2.jpg",
      onSale: true,
      rating: 4.2,
      reviews: 89,
    },
    {
      id: 3,
      name: "Casual Denim Dress",
      price: 69.99,
      image: "/images/dress3.jpg",
      onSale: false,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Bohemian Maxi Dress",
      price: 79.99,
      salePrice: 64.99,
      image: "/images/dress4.jpg",
      onSale: true,
      rating: 4.4,
      reviews: 112,
    },
  ];

  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="/women" underline="hover" color="inherit">
            Women
          </Link>
          <Typography color="text.primary">Dresses</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 2 }}>
              <ProductImage src={product.images[selectedImage]} alt={product.name} />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              {product.images.map((image, index) => (
                <ThumbnailImage key={index} src={image} alt={`${product.name} ${index + 1}`} selected={selectedImage === index} onClick={() => setSelectedImage(index)} />
              ))}
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <PriceText variant="h5" component="span">
                ${product.price}
              </PriceText>
              {product.originalPrice && (
                <Typography variant="body1" component="span" sx={{ textDecoration: "line-through", ml: 2, color: "#666" }}>
                  ${product.originalPrice}
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Size:
                </Typography>
                <Tooltip title="Find your perfect size">
                  <IconButton size="small" onClick={() => setShowSizeRecommendation(true)} sx={{ ml: 1 }}>
                    <StraightenIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                {product.sizes.map((size) => (
                  <SizeButton key={size} variant="outlined" selected={selectedSize === size} onClick={() => setSelectedSize(size)}>
                    {size}
                  </SizeButton>
                ))}
              </Box>
            </Box>

            {showSizeRecommendation && (
              <SizeRecommendation
                category={product.category}
                sizes={product.sizes}
                onSizeSelect={(size) => {
                  setSelectedSize(size);
                  setShowSizeRecommendation(false);
                }}
              />
            )}

            <Box sx={{ mb: 3 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Quantity</InputLabel>
                <Select value={quantity} label="Quantity" onChange={(e) => setQuantity(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />} onClick={handleAddToCart} fullWidth>
                Add to Cart
              </Button>
              <Button variant="outlined" size="large" startIcon={<FavoriteIcon />} onClick={handleWishlistClick} color={isInWishlistState ? "error" : "primary"}>
                {isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </Box>

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tab label="Details" />
              <Tab label="Size Guide" />
              <Tab label="Reviews" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <ul>
                {product.details.map((detail, index) => (
                  <Typography key={index} component="li" sx={{ mb: 1 }}>
                    {detail}
                  </Typography>
                ))}
              </ul>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <SizeGuide category={product.category} />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <ProductReviews
                productId={product.id}
                initialReviews={[
                  {
                    id: 1,
                    userId: "user1",
                    userName: "Sarah M.",
                    rating: 5,
                    comment: "Love this dress! The material is high quality and the fit is perfect. I got so many compliments when wearing it.",
                    date: "2023-05-15T10:30:00Z",
                    helpful: 12,
                  },
                  {
                    id: 2,
                    userId: "user2",
                    userName: "Emily R.",
                    rating: 4,
                    comment: "Beautiful dress, but runs slightly large. I would recommend sizing down.",
                    date: "2023-05-10T15:45:00Z",
                    helpful: 8,
                  },
                  {
                    id: 3,
                    userId: "user3",
                    userName: "Jessica K.",
                    rating: 5,
                    comment: "Perfect for summer! The floral print is even more beautiful in person.",
                    date: "2023-05-05T09:20:00Z",
                    helpful: 5,
                  },
                ]}
              />
            </TabPanel>
          </Grid>
        </Grid>

        <RelatedProducts
          products={[
            {
              id: "dress2",
              name: "Floral Wrap Dress",
              price: 34.99,
              originalPrice: 45.99,
              images: ["https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp"],
            },
            {
              id: "dress3",
              name: "Summer Midi Dress",
              price: 39.99,
              images: ["https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp"],
            },
            {
              id: "dress4",
              name: "Bohemian Maxi Dress",
              price: 49.99,
              originalPrice: 59.99,
              images: ["https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp"],
            },
            {
              id: "dress5",
              name: "Casual Sundress",
              price: 29.99,
              images: ["https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp"],
            },
          ]}
          currentProductId={id}
        />

        {/* Product Recommendations */}
        <Container maxWidth="lg">
          <ProductRecommendations title="You May Also Like" products={recommendedProducts} type="grid" />

          {recentlyViewed.length > 0 && <ProductRecommendations title="Recently Viewed" products={recentlyViewed} type="grid" />}
        </Container>
      </Container>
    </>
  );
};

export default ProductDetails;
