import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

// Import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Women from './pages/Women';
import Men from './pages/Men';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import OrderConfirmation from './pages/OrderConfirmation';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from './pages/Checkout';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import SearchResults from './pages/SearchResults';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import Layout from './components/layout/Layout';

// Placeholder components
const PlaceOrder = () => <div>Place Order</div>;
const Payment = () => <div>Payment</div>;
const Success = () => <div>Success</div>;

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "women",
        element: <Women />
      },
      {
        path: "men",
        element: <Men />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <Checkout />,
        children: [
          {
            path: "placeorder",
            element: <PlaceOrder />
          },
          {
            path: "payment",
            element: <Payment />
          },
          {
            path: "success",
            element: <Success />
          }
        ]
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />
      },
      {
        path: "wishlist",
        element: <Wishlist />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "search",
        element: <SearchResults />
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <RouterProvider router={router} />
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
