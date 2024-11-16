import React from "react";
import { Box, Container, Grid, Typography, IconButton, TextField, Button, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, Pinterest, YouTube, LinkedIn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        py: 8,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RouterLink to="/home" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </RouterLink>
              <RouterLink to="/shop" style={{ color: "inherit", textDecoration: "none" }}>
                Shop
              </RouterLink>
              <RouterLink to="/blog" style={{ color: "inherit", textDecoration: "none" }}>
                Blog
              </RouterLink>
              <RouterLink to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                Contact
              </RouterLink>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Contact Us
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Track Order
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Shipping Info
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Returns & Exchanges
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Size Guide
              </RouterLink>
            </Box>
          </Grid>

          {/* About SHEIN */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About SHEIN
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                About Us
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Careers
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Sustainability
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Press
              </RouterLink>
              <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }}>
                Affiliate Program
              </RouterLink>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Stay Connected
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ mb: 2 }}>
              <TextField fullWidth size="small" placeholder="Enter your email" sx={{ mb: 1 }} />
              <Button fullWidth variant="contained" type="submit" sx={{ textTransform: "none" }}>
                Subscribe to Newsletter
              </Button>
            </Box>
            <Typography variant="subtitle2" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" size="small">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" size="small">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" size="small">
                <Instagram />
              </IconButton>
              <IconButton href="https://pinterest.com" target="_blank" rel="noopener noreferrer" size="small">
                <Pinterest />
              </IconButton>
              <IconButton href="https://youtube.com" target="_blank" rel="noopener noreferrer" size="small">
                <YouTube />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" rel="noopener noreferrer" size="small">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} SHEIN. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }} variant="body2">
              Sitemap
            </RouterLink>
            <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }} variant="body2">
              Accessibility
            </RouterLink>
            <RouterLink to="/coming-soon" style={{ color: "inherit", textDecoration: "none" }} variant="body2">
              Do Not Sell My Info
            </RouterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
