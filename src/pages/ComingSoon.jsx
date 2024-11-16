import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
}));

// const BackgroundBox = styled(Box)(({ theme }) => ({
//   minHeight: '90vh',
//   background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp')`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'relative',
// }));
const BackgroundBox = styled(Box)(({ theme }) => ({
    minHeight: '90vh',
    background: `linear-gradient(135deg, 
      #FF4B8B 0%,
      #FF6B6B 25%,
      #FF8E53 50%,
      #FFA07A 75%,
      #FFB6C1 100%)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  }));

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <BackgroundBox>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h2" component="h1" gutterBottom>
                Coming Soon
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                We're working on something amazing!
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Get ready for an exclusive collection of trendy fashion items.
                Be the first to know when we launch!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  gap: 2,
                  maxWidth: 500,
                  margin: '0 auto',
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    minWidth: 150,
                    backgroundColor: 'black',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Notify Me
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Stay tuned for exclusive deals and new arrivals!
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </BackgroundBox>
  );
};

export default ComingSoon;