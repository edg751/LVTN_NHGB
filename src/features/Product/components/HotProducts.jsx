import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import productApi from "api/productApi";
import Product from "./Product";

const products = [
  { id: 1, name: "Product 1", image: "image1.jpg" },
  { id: 2, name: "Product 2", image: "image2.jpg" },
  { id: 3, name: "Product 3", image: "image3.jpg" },
  { id: 4, name: "Product 4", image: "image4.jpg" },
  { id: 5, name: "Product 5", image: "image5.jpg" },
  { id: 6, name: "Product 6", image: "image6.jpg" },
  // Thêm các sản phẩm khác vào danh sách
];

const HotProducts = () => {
  const [productHotList, setProductHotList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getAllProduct(
          "",
          10,
          1,
          "",
          "",
          "",
          "",
          "",
          "bestselling"
        );
        setProductHotList(
          list.map((x) => ({
            id: x.id_product,
            name: x.product_name,
            price: x.price,
            color: x.colors_list,
            image: x.images_list,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  console.log(productHotList);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div>
      <Box>
        <Typography sx={{ fontSize: "35px" }}>Sản phẩm bán chạy</Typography>
        <Slider {...settings}>
          {productHotList.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {/* PRODUCT CARD */}
              <Product product={product} />
            </Grid>
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default HotProducts;
