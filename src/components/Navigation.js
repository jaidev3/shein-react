import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem, Divider, Badge, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useWishlist } from "../context/WishlistContext";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const NavButton = styled(Button)`
  color: white;
  margin: 0 8px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TopBar = styled(Box)`
  background-color: black;
  color: white;
  padding: 8px;
  text-align: center;
`;

const Logo = styled(Typography)`
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  padding: 0 16px;
`;

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { getCartItemsCount, cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const renderUserMenu = () => {
    if (!user) {
      return (
        <Button color="inherit" component={StyledLink} to="/signin" startIcon={<PersonOutlineIcon />}>
          Sign In
        </Button>
      );
    }

    return (
      <>
        <IconButton color="inherit" onClick={handleMenuOpen} aria-label="account" aria-controls="user-menu" aria-haspopup="true">
          <PersonOutlineIcon />
        </IconButton>
        <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem disabled>
            <Typography variant="body2">{user.email}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose} component={StyledLink} to="/profile">
            My Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={StyledLink} to="/orders">
            My Orders
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Logo variant="h5" component={StyledLink} to="/">
            SHEIN
          </Logo>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, mx: 2 }}>
            <form onSubmit={handleSearch} style={{ width: "100%", maxWidth: 600 }}>
              <TextField
                fullWidth
                size="small"
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
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </form>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {renderUserMenu()}
            <IconButton color="inherit" component={StyledLink} to="/cart" sx={{ ml: 2 }}>
              <Badge badgeContent={getCartItemsCount()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={StyledLink} to="/wishlist" sx={{ ml: 1 }}>
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            bgcolor: "primary.dark",
            py: 1,
            px: 4,
          }}
        >
          <NavButton component={StyledLink} to="/women">
            WOMEN
          </NavButton>
          <NavButton component={StyledLink} to="/coming-soon">
            CURVE+PLUS
          </NavButton>
          <NavButton component={StyledLink} to="/coming-soon">
            KIDS
          </NavButton>
          <NavButton component={StyledLink} to="/men">
            MEN
          </NavButton>
          <NavButton component={StyledLink} to="/coming-soon">
            BEAUTY
          </NavButton>
          <NavButton component={StyledLink} to="/">
            HOME
          </NavButton>
        </Box>
      </AppBar>
      {/* <TopBar>
        <Typography variant="body2">Free Standard Shipping on Orders Over $49</Typography>
      </TopBar> */}
    </>
  );
};

export default Navigation;
