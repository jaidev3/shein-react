import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GalleryContainer = styled("div")`
  overflow-x: auto;
`;

const StyledCard = styled(Card)`
  width: 300px;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    transform: scale(1.02);
  }
`;

const StyleImage = styled(CardMedia)`
  height: 400px;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${StyledCard}:hover &::after {
    opacity: 1;
  }
`;

const BuyButton = styled("a")`
  background: white;
  color: black;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(20px);
  display: inline-block;

  &:hover {
    background: #f5f5f5;
  }

  ${StyledCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OverlayContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
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
  z-index: 2;
`;

const ImageInfo = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 2;

  ${StyledCard}:hover & {
    transform: translateY(0);
  }
`;

const StyledContainer = styled(Box)`
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyleGallery = () => {
  const styles = [
    {
      id: 1,
      image: "https://img.ltwebstatic.com/images3_app/2021/09/01/163045925888ed129d778109a91c61d56e9ee9dc21.webp",
      username: "@fashionista",
      description: "Summer vibes with floral dress",
      likes: 1234,
    },
    {
      id: 2,
      image: "https://img.ltwebstatic.com/images3_app/2021/08/23/1629681381a757ae1fa2bbb1788ecf9101b3faeb5a.webp",
      username: "@styleicon",
      description: "Street style look",
      likes: 856,
    },
    {
      id: 3,
      image: "https://img.ltwebstatic.com/images3_app/2021/08/13/1628818538b1b80df5bd3850aa43190f11cb65bb78.webp",
      username: "@trendysetter",
      description: "Casual chic outfit",
      likes: 2345,
    },
    {
      id: 4,
      image: "https://img.ltwebstatic.com/images3_app/2021/08/30/16302867650d50cf2a73747f82737aebb884831a5e.webp",
      username: "@fashionblogger",
      description: "Evening elegance",
      likes: 1567,
    },
    {
      id: 5,
      image: "https://img.ltwebstatic.com/images3_app/2021/09/01/1630459232b397e423518c33e1e48bd13990682758.webp",
      username: "@fashionstyle",
      description: "Modern casual look",
      likes: 1890,
    },
  ];

  return (
    <GalleryContainer>
      <Container maxWidth="xl">
        <StyledContainer>
          {styles.map((style) => (
            <StyledCard key={style.id}>
              <StyleImage image={style.image} title={style.description} />
              <LikesBox>
                <FavoriteIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="body2">{style.likes}</Typography>
              </LikesBox>
              <OverlayContent>
                <BuyButton href="#">Buy Now</BuyButton>
              </OverlayContent>
              <ImageInfo>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {style.username}
                </Typography>
                <Typography variant="body2">{style.description}</Typography>
              </ImageInfo>
            </StyledCard>
          ))}
        </StyledContainer>
      </Container>
    </GalleryContainer>
  );
};

export default StyleGallery;
