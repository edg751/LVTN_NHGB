import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import productApi from "api/productApi";
import { Link } from "react-router-dom";

const ViewProduct = ({ products }) => {
  const [productNewList, setProductNewList] = useState([]);

  console.log("Day la view Product:", products);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: Math.min(4, products.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: Math.min(3, products.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, products.length),
        },
      },
    ],
  };

  return (
    <div>
      <Box sx={{ margin: "30px 0px" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: "30px" }}
        >
          Sản phẩm đã xem
        </Typography>
        <Slider {...settings}>
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Link
                to={`/products/0/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    marginLeft: "30px",
                    marginRight: "30px",
                    color: "black",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default ViewProduct;
