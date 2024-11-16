import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  YouTube,
  Email,
} from '@mui/icons-material';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Track Order
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Shipping Info
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Returns & Exchanges
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Size Guide
              </Link>
            </Box>
          </Grid>

          {/* About SHEIN */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About SHEIN
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Careers
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Sustainability
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Press
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Affiliate Program
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Terms & Conditions
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Cookie Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Intellectual Property
              </Link>
              <Link href="#" color="inherit" underline="hover">
                California Supply Chains Act
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Stay Connected
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your email"
                sx={{ mb: 1 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ textTransform: 'none' }}
              >
                Subscribe to Newsletter
              </Button>
            </Box>
            <Typography variant="subtitle2" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <Pinterest />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SHEIN. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Sitemap
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Accessibility
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2">
              Do Not Sell My Info
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
