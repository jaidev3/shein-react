import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledCard = styled(Card)`
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyleImage = styled(CardMedia)`
  height: 400px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  }
`;

const OverlayContent = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
  z-index: 1;
`;

const LikesBox = styled(Box)`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 16px;
  color: white;
`;

const StyleGallery = () => {
  const styles = [
    {
      id: 1,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      username: "@fashionista",
      description: "Summer vibes with floral dress",
      likes: 1234
    },
    {
      id: 2,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      username: "@styleicon",
      description: "Street style look",
      likes: 856
    },
    {
      id: 3,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      username: "@trendysetter",
      description: "Casual chic outfit",
      likes: 2345
    },
    {
      id: 4,
      image: "https://img.ltwebstatic.com/images3_ach/2021/09/27/16327137893ab12738106a1ef5ea2da1435b13beec.webp",
      username: "@fashionblogger",
      description: "Evening elegance",
      likes: 1567
    }
  ];

  return (
    <Grid container spacing={3}>
      {styles.map((style) => (
        <Grid item xs={12} sm={6} md={3} key={style.id}>
          <StyledCard>
            <StyleImage
              image={style.image}
              title={style.description}
            />
            <LikesBox>
              <FavoriteIcon sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">
                {style.likes}
              </Typography>
            </LikesBox>
            <OverlayContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {style.username}
              </Typography>
              <Typography variant="body2">
                {style.description}
              </Typography>
            </OverlayContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StyleGallery;
