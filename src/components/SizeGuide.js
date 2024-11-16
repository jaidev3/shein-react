import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const SizeGuide = ({ category = 'dresses' }) => {
  const sizeCharts = {
    dresses: {
      headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)', 'Length (in)'],
      rows: [
        ['XS', '31.5-33', '24-25.5', '34.5-36', '33.5'],
        ['S', '33.5-35', '26-27.5', '36.5-38', '34'],
        ['M', '35.5-37', '28-29.5', '38.5-40', '34.5'],
        ['L', '37.5-39', '30-31.5', '40.5-42', '35'],
        ['XL', '39.5-41', '32-33.5', '42.5-44', '35.5'],
      ],
    },
    tops: {
      headers: ['Size', 'Bust (in)', 'Shoulder (in)', 'Length (in)', 'Sleeve (in)'],
      rows: [
        ['XS', '31.5-33', '14.5', '23', '23'],
        ['S', '33.5-35', '15', '23.5', '23.5'],
        ['M', '35.5-37', '15.5', '24', '24'],
        ['L', '37.5-39', '16', '24.5', '24.5'],
        ['XL', '39.5-41', '16.5', '25', '25'],
      ],
    },
    bottoms: {
      headers: ['Size', 'Waist (in)', 'Hip (in)', 'Length (in)', 'Inseam (in)'],
      rows: [
        ['XS', '24-25.5', '34.5-36', '38', '28'],
        ['S', '26-27.5', '36.5-38', '38.5', '28.5'],
        ['M', '28-29.5', '38.5-40', '39', '29'],
        ['L', '30-31.5', '40.5-42', '39.5', '29.5'],
        ['XL', '32-33.5', '42.5-44', '40', '30'],
      ],
    },
  };

  const selectedChart = sizeCharts[category] || sizeCharts.dresses;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Size Guide
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Measurements are in inches. For the best fit, measure your body and compare to the size chart below.
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {selectedChart.headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedChart.rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          How to Measure
        </Typography>
        <Typography variant="body2" paragraph>
          • Bust: Measure around the fullest part of your bust
        </Typography>
        <Typography variant="body2" paragraph>
          • Waist: Measure around your natural waistline
        </Typography>
        <Typography variant="body2" paragraph>
          • Hip: Measure around the fullest part of your hips
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Note: All measurements are approximate. For the best fit, we recommend trying on items or referring to customer reviews.
        </Typography>
      </Box>
    </Box>
  );
};

export default SizeGuide;
