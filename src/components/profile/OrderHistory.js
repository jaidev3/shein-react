import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';

const StatusChip = styled(Chip)(({ status }) => {
  const colors = {
    pending: '#ffa726',
    processing: '#29b6f6',
    shipped: '#66bb6a',
    delivered: '#43a047',
    cancelled: '#ef5350',
  };
  return {
    backgroundColor: colors[status] || colors.pending,
    color: '#fff',
    '& .MuiChip-label': {
      textTransform: 'capitalize',
    },
  };
});

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Order #{order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(order.date)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6">
              ${order.total.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <StatusChip
              label={order.status}
              status={order.status}
              icon={order.status === 'shipped' ? <LocalShippingIcon /> : <ReceiptIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle2">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">
                        ${order.total.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open(`/track-order/${order.id}`, '_blank')}
                startIcon={<LocalShippingIcon />}
              >
                Track Order
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open(`/order-details/${order.id}`, '_blank')}
                startIcon={<ReceiptIcon />}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const ordersPerPage = 5;

  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: 'ORD123456',
      date: '2023-05-20',
      total: 129.99,
      status: 'delivered',
      items: [
        { name: 'Floral Maxi Dress', quantity: 1, price: 89.99 },
        { name: 'Denim Jacket', quantity: 1, price: 40.00 },
      ],
    },
    {
      id: 'ORD123457',
      date: '2023-05-15',
      total: 79.99,
      status: 'processing',
      items: [
        { name: 'Summer Blouse', quantity: 2, price: 39.99 },
      ],
    },
    {
      id: 'ORD123458',
      date: '2023-05-10',
      total: 149.99,
      status: 'shipped',
      items: [
        { name: 'Evening Gown', quantity: 1, price: 149.99 },
      ],
    },
    {
      id: 'ORD123459',
      date: '2023-05-05',
      total: 89.99,
      status: 'cancelled',
      items: [
        { name: 'Casual Dress', quantity: 1, price: 89.99 },
      ],
    },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search orders by order number or item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {paginatedOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {filteredOrders.length > ordersPerPage && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(filteredOrders.length / ordersPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {filteredOrders.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No orders found matching your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderHistory;
