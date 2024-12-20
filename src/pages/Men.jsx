import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import ProductList from '../components/ProductList';
import { Pagination, Stack } from '@mui/material';

const Men = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate pagination indexes
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = menProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(menProducts.length / productsPerPage);

  // Updated handle page changes with slower smooth scroll
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    const duration = 1000; // Increase this value for slower scroll (in milliseconds)
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic = progress => {
        return progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      };

      window.scrollTo({
        top: start * (1 - easeInOutCubic(progress)),
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      {/* <Navigation /> */}
      <ProductList category="Men's Fashion" products={currentProducts} />
      
      {/* MUI Pagination */}
      <Stack spacing={2} alignItems="center" sx={{ my: 4 }}>
        <Pagination 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton 
          showLastButton
        />
      </Stack>
    </>
  );
};

export default Men;

// Mock data for men's products
const menProducts = [
  {
    id: 'm1',
    name: 'SHEIN Men Geo Print Shirt',
    price: 980,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/06/163089114277131b1e549b130619aae6eeeb15d2a8_thumbnail_900x.webp',
    date: '2023-05-15',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm2',
    name: 'SHEIN Men Floral Embroidery Sheer Mesh Shirt',
    price: 120,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/06/16308912973c567d8b7babfde1237fddd635413c7f_thumbnail_900x.webp',
    date: '2023-05-14',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm3',
    name: 'Men Plaid Slant Pocket PJ Set',
    price: 2000,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/08/09/1628478723aa39431759a7ca94d5e5b4dd84332937_thumbnail_900x.webp',
    date: '2023-05-13',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm4',
    name: 'Men Contrast Panel Topstitching Shirt',
    price: 1250,
    image: 'https://img.ltwebstatic.com/images3_pi/2019/09/27/1569571052b04cb2dd11ecd58f0c5f4d2ef4635f06_thumbnail_900x.webp',
    date: '2023-05-12',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm5',
    name: 'SHEIN Men Geo Print Shirt',
    price: 980,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/08/17/16291855517a5b34a6476a3ffedd26c8c6569f2d8d_thumbnail_900x.webp',
    date: '2023-05-11',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm6',
    name: 'SHEIN Men Striped Patched Detail Tee',
    price: 750,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/07/30/16276489837dd2c777613922bd9715dec5e45ee7b9_thumbnail_900x.webp',
    date: '2023-05-10',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm7',
    name: 'Men Stand Neck Button Up Shirt',
    price: 1800,
    image: 'https://img.ltwebstatic.com/images3_pi/2020/11/25/16062670368404cbe1beacd34657c120ed1afb2dfa_thumbnail_900x.webp',
    date: '2023-05-09',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm8',
    name: 'Men Letter Patched Curved Hem Tee',
    price: 1000,
    image: 'https://img.ltwebstatic.com/images3_pi/2020/06/08/15916029351338614af1845fc62b0dd129c3ebd0b1_thumbnail_900x.webp',
    date: '2023-05-08',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm9',
    name: 'SHEIN Men Collared Cord Shirt',
    price: 2000,
    image: 'https://img.ltwebstatic.com/images3_pi/2020/10/30/160402629168a84cfd76df41573d275b390532a5f1_thumbnail_900x.webp',
    date: '2023-05-07',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm10',
    name: 'SHEIN Men Pocket Patched Half Button Shirt',
    price: 1800,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/07/21/1626858003e173c20a699e99bb2d4c9c6fe8144a76_thumbnail_900x.webp',
    date: '2023-05-06',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm11',
    name: 'Men Button Front Solid Shirt',
    price: 1500,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/04/02/1617331977353064593a2399f16dfab721c8808680_thumbnail_900x.webp',
    date: '2023-05-05',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm12',
    name: 'Men Pocket Front Button Up Shirt',
    price: 1700,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/07/23/1627017135295e4e96062ea09caa53f4fff76e771b_thumbnail_900x.webp',
    date: '2023-05-04',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm13',
    name: 'SHEIN Men Half Button Shirt',
    price: 2200,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/10/1631262613993793468ad2beedf8203455952cee5d_thumbnail_900x.webp',
    date: '2023-05-03',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm14',
    name: 'Men Pocket Front Button Up Shirt',
    price: 2400,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/07/23/1627017135295e4e96062ea09caa53f4fff76e771b_thumbnail_900x.webp',
    date: '2023-05-02',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm15',
    name: 'SHEIN Men Floral Print Button Front Shirt',
    price: 1500,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/26/163265086505656add61f8dbd20d8385f320973422_thumbnail_900x.webp',
    date: '2023-05-01',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm16',
    name: 'Extended Sizes Men Striped Print Shirt',
    price: 1000,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/09/1631167018c44e6c6638884ebba6cb0b94202c3c44_thumbnail_900x.webp',
    date: '2023-04-30',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm17',
    name: 'Extended Sizes Men Plaid Button Front Shirt',
    price: 1800,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/07/163098316910d04c36f9bbcbe8a0e218b833e9f463_thumbnail_900x.webp',
    date: '2023-04-29',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm18',
    name: 'Extended Sizes Men Slogan & Striped Pocket Front Shirt',
    price: 2800,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/08/26/1629943602132bed4ebe9080c5153d9d1867ab566c_thumbnail_900x.webp',
    date: '2023-04-28',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm19',
    name: 'Men Plaid Pocket Front Shirt',
    price: 1600,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/02/1630564913adb9148b704058adba9f98c7583cb70d_thumbnail_900x.webp',
    date: '2023-04-27',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm20',
    name: 'Men Plaid Button Up Shirt',
    price: 1500,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/06/28/162488424465ee6d5f80c5e027d4e8f1b77bb79e34_thumbnail_900x.webp',
    date: '2023-04-26',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm21',
    name: 'SHEIN BASICS Men Plaid Button Up Flannel Shirt',
    price: 1450,
    image: 'https://img.ltwebstatic.com/images3_pi/2020/09/08/1599537000704a55dc991177ff70ec35ca4ca73ea5_thumbnail_900x.webp',
    date: '2023-04-25',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm22',
    name: 'SHEIN Men Tartan Button Front Shirt',
    price: 1600,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/02/22/161398590679854fb4524d8c260ef440e762d8c4b6_thumbnail_900x.webp',
    date: '2023-04-24',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm23',
    name: 'SHEIN Men Pocket Patched Drop Shoulder Denim Shirt',
    price: 2450,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/27/163270771903595fe5d9deee36ad44db3c18a515c1_thumbnail_900x.webp',
    date: '2023-04-23',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm24',
    name: 'Men Flap Pocket Denim Shirt',
    price: 3200,
    image: 'https://sheinsz.ltwebstatic.com/she_dist/images/bg-grey-ba96515e9b.png',
    date: '2023-04-22',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm25',
    name: 'Men Solid Round Neck Tee',
    price: 2150,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/08/27/163005058919afae1fb23e36c5b1340f9bfdabadb9_thumbnail_900x.webp',
    date: '2023-04-21',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm26',
    name: 'Men Letter & Graphic Print Tee',
    price: 1900,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/09/07/163098390729c0229e743b92a0aaee8fd6e3c7c10f_thumbnail_900x.webp',
    date: '2023-04-20',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm27',
    name: 'Men Feather Print Tee',
    price: 1250,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/07/05/1625470059517c64244e2bb34d06aeee34c69fb607_thumbnail_900x.webp',
    date: '2023-04-19',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm28',
    name: 'SHEIN Men Patch Pocket Solid Polo Shirt',
    price: 900,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/03/01/16145660062046d55633ef97467b778773a224b270_thumbnail_900x.webp',
    date: '2023-04-18',
    colors: ['White', 'Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm29',
    name: 'Men Animal Print Polo Shirt',
    price: 1250,
    image: 'https://img.ltwebstatic.com/images3_pi/2021/05/31/1622436883d76f9d136ed4bb7a6bcbbd2e562a7825_thumbnail_900x.webp',
    date: '2023-04-17',
    colors: ['Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'm30',
    name: 'Men Striped & Giraffe Print Polo Shirt',
    price: 1000,
    image: 'https://img.ltwebstatic.com/images3_pi/2020/04/21/15874744100c21de3152f257181c00e0df15984db6_thumbnail_900x.webp',
    date: '2023-04-16',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];
