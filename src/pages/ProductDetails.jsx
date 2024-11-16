import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import { 
  Container, Grid, Typography, Box, Button, Rating, Tabs, 
  Tab, Select, MenuItem, FormControl, InputLabel, Breadcrumbs, 
  Link, IconButton, Tooltip, Paper, Chip, Divider, Zoom 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StraightenIcon from "@mui/icons-material/Straighten";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navigation from "../components/Navigation";
import SizeGuide from "../components/SizeGuide";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import ProductRecommendations from "../components/ProductRecommendations";
import SizeRecommendation from "../components/SizeRecommendation";

const ProductImage = styled("img")`
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: zoom-in;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ThumbnailImage = styled("img")`
  width: 80px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => (props.selected ? "#000" : "transparent")};
  
  &:hover {
    border-color: #666;
    transform: translateY(-2px);
  }
`;

const PriceText = styled(Typography)`
  color: #ff4081;
  font-weight: 600;
  font-size: 1.8rem;
`;

const SizeButton = styled(Button)`
  min-width: 60px;
  margin: 0 8px 8px 0;
  border-radius: 20px;
  padding: 8px 16px;
  border-color: ${(props) => (props.selected ? "#000" : "#ddd")};
  background-color: ${(props) => (props.selected ? "#000" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#666")};
  
  &:hover {
    background-color: ${(props) => (props.selected ? "#000" : "#f5f5f5")};
    border-color: #000;
  }
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  font-weight: 500;
  font-size: 1rem;
`;

const FeatureChip = styled(Chip)`
  margin: 4px;
  background-color: #f8f8f8;
  border: 1px solid #eee;
  font-weight: 500;
`;

const TabPanel = ({ children, value, index }) => <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

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
        "https://img.ltwebstatic.com/images3_pi/2021/09/06/163089114277131b1e549b130619aae6eeeb15d2a8_thumbnail_900x.webp",
        "https://img.ltwebstatic.com/images3_pi/2021/08/09/1628478723aa39431759a7ca94d5e5b4dd84332937_thumbnail_900x.webp",
        "https://img.ltwebstatic.com/images3_pi/2019/09/27/1569571052b04cb2dd11ecd58f0c5f4d2ef4635f06_thumbnail_900x.webp",
        "https://img.ltwebstatic.com/images3_pi/2021/08/17/16291855517a5b34a6476a3ffedd26c8c6569f2d8d_thumbnail_900x.webp",
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

  const recommendedProducts = [
    {
      id: 2,
      name: "Striped Summer Dress",
      price: 59.99,
      salePrice: 49.99,
      image: "https://img.ltwebstatic.com/images3_pi/2020/11/25/16062670368404cbe1beacd34657c120ed1afb2dfa_thumbnail_900x.webp",
      onSale: true,
      rating: 4.2,
      reviews: 89,
    },
    {
      id: 3,
      name: "Casual Denim Dress",
      price: 69.99,
      image: "https://img.ltwebstatic.com/images3_pi/2020/06/08/15916029351338614af1845fc62b0dd129c3ebd0b1_thumbnail_900x.webp",
      onSale: false,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Bohemian Maxi Dress",
      price: 79.99,
      salePrice: 64.99,
      image: "https://img.ltwebstatic.com/images3_pi/2020/10/30/160402629168a84cfd76df41573d275b390532a5f1_thumbnail_900x.webp",
      onSale: true,
      rating: 4.4,
      reviews: 112,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="/women" underline="hover" color="inherit">
          Women
        </Link>
        <Typography color="text.primary">{product.category}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f8f8f8', borderRadius: 2 }}>
            <Zoom in={true}>
              <Box>
                <ProductImage src={product.images[selectedImage]} alt={product.name} />
              </Box>
            </Zoom>
            <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
              {product.images.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  selected={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <PriceText component="span">
                ${product.price}
              </PriceText>
              {product.originalPrice && (
                <Typography variant="h6" component="span" sx={{ textDecoration: "line-through", ml: 2, color: "#666" }}>
                  ${product.originalPrice}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Size
                </Typography>
                <Tooltip title="Find your perfect size">
                  <IconButton size="small" onClick={() => setShowSizeRecommendation(true)} sx={{ ml: 1 }}>
                    <StraightenIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                {product.sizes.map((size) => (
                  <SizeButton
                    key={size}
                    variant="outlined"
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity}
                  label="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
                sx={{
                  py: 1.5,
                  backgroundColor: '#000',
                  '&:hover': { backgroundColor: '#333' }
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteIcon />}
                onClick={handleWishlistClick}
                color={isInWishlistState ? "error" : "primary"}
                sx={{ py: 1.5 }}
              >
                {isInWishlistState ? "Saved" : "Save"}
              </Button>
            </Box>

            <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon />
                  <Typography variant="body2">Free Shipping</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentReturnIcon />
                  <Typography variant="body2">Free Returns</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon />
                  <Typography variant="body2">In Stock</Typography>
                </Box>
              </Box>
            </Paper>

            <Box sx={{ mb: 4 }}>
              {product.details.map((detail, index) => (
                <FeatureChip key={index} label={detail} />
              ))}
            </Box>

            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ 
                borderBottom: 1, 
                borderColor: "divider",
                '& .MuiTabs-indicator': {
                  backgroundColor: '#000'
                }
              }}
            >
              <StyledTab label="Details" />
              <StyledTab label="Size Guide" />
              <StyledTab label="Reviews" />
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
          </Box>
        </Grid>
      </Grid>

      <RelatedProducts
        products={[
          {
            id: "dress2",
            name: "Floral Wrap Dress",
            price: 34.99,
            originalPrice: 45.99,
            images: ["https://img.ltwebstatic.com/images3_pi/2021/07/30/16276489837dd2c777613922bd9715dec5e45ee7b9_thumbnail_900x.webp"],
          },
          {
            id: "dress3",
            name: "Summer Midi Dress",
            price: 39.99,
            images: ["https://img.ltwebstatic.com/images3_pi/2020/06/08/15916029351338614af1845fc62b0dd129c3ebd0b1_thumbnail_900x.webp"],
          },
          {
            id: "dress4",
            name: "Bohemian Maxi Dress",
            price: 49.99,
            originalPrice: 59.99,
            images: ["https://img.ltwebstatic.com/images3_pi/2021/09/09/1631167018c44e6c6638884ebba6cb0b94202c3c44_thumbnail_900x.webp"],
          },
          {
            id: "dress5",
            name: "Casual Sundress",
            price: 29.99,
            images: ["https://img.ltwebstatic.com/images3_pi/2021/09/06/16308912973c567d8b7babfde1237fddd635413c7f_thumbnail_900x.webp"],
          },
        ]}
        currentProductId={id}
      />

      <Container maxWidth="lg">
        <ProductRecommendations title="You May Also Like" products={recommendedProducts} type="grid" />

        {recentlyViewed.length > 0 && <ProductRecommendations title="Recently Viewed" products={recentlyViewed} type="grid" />}
      </Container>
    </Container>
  );
};

export default ProductDetails;
