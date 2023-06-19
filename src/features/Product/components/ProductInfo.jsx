import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ColorChoose from "./ColorChoose";
import SizeChoose from "./SizeChoose";
import AddToCard from "./AddQuantity";
import AddQuantity from "./AddQuantity";
import { useParams } from "react-router-dom";
import productApi from "api/productApi";

const StyledSpanSizeHelp = styled.p`
  margin-left: 10px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: #27006f;
  font-style: italic;
`;

const StyledButtonAddCard = styled(Button)`
  width: 96%;
  height: 40px;
  background-color: #fcaf17;
  color: black;
  margin-top: 30px;

  &:hover {
    background-color: #da9610;
  }
`;

const StyledButtonAddFavorite = styled(Button)`
  width: 96%;
  height: 40px;
  background-color: #27006f;
  color: white;
  margin-top: 15px;

  &:hover {
    background-color: #1e0252;
  }
`;

const StyledTypographyName = styled(Typography)`
  font-size: 23px;
  text-align: left;
  margin-top: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-left: 10px;
`;
const StyledProductId = styled(Typography)`
  border-right: 1px solid grey;
  display: inline-block;
  padding: 0 10px;
  font-size: 15px;
`;

const StyledProductSold = styled(Typography)`
  border-right: 1px solid grey;
  display: inline-block;
  padding: 0 10px;
  font-size: 15px;
`;
const StyledBoxDetail = styled(Box)`
  display: flex;
`;
const StyledProductRating = styled(Rating)`
  margin-left: 10px;
`;
const StyledProductPrice = styled(Typography)`
  text-align: left;
  font-size: 23px;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: 600;
`;
const StyledSpanQuantityRate = styled.span`
  margin-left: 5px;
`;
ProductInfo.propTypes = {};

function ProductInfo({ handleSize, product }) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleChangeColor = (color) => {
    setSelectedColor(color);
    console.log("Màu trong Product Detail: ", color);
  };

  const handleChangeSize = (size) => {
    setSelectedSize(size);
    console.log("Size trong Product Detail: ", size);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
    console.log("SL trong product Detail: ", quantity);
  };
  const handleSizeHelp = () => {
    handleSize();
  };

  const handleAddToCard = () => {
    console.log(
      `Mã sp: huhu, Màu: ${selectedColor}, Size ${selectedSize}, Số lượng ${selectedQuantity}`
    );
  };
  const handleAddToFavorite = () => {};

  return (
    <Box>
      <StyledTypographyName>{product[0].name}</StyledTypographyName>
      <StyledBoxDetail>
        <StyledProductId>Mã sản phẩm : {product[0].id}</StyledProductId>
        <StyledProductSold>Đã bán : {product[0].sold}</StyledProductSold>
        <StyledProductRating
          name="half-rating-read"
          defaultValue={product[0].rate / product[0].total_rate}
          precision={0.5}
          readOnly
        />
        <StyledSpanQuantityRate>{product[0].total_rate}</StyledSpanQuantityRate>
        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      </StyledBoxDetail>
      <StyledProductPrice>
        {" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product[0].price)}
      </StyledProductPrice>

      <ColorChoose
        color={product[0].colors}
        selectedColor={selectedColor}
        handleChangeColor={handleChangeColor}
      />
      <SizeChoose
        size={product}
        selectedSize={selectedSize}
        handleChangeSize={handleChangeSize}
      />
      <StyledSpanSizeHelp onClick={handleSizeHelp}>
        Hướng dẫn chọn size
      </StyledSpanSizeHelp>

      <AddQuantity handleQuantityChange={handleQuantityChange} />
      <StyledButtonAddCard variant="contained" onClick={handleAddToCard}>
        Thêm vào giỏ hàng
      </StyledButtonAddCard>

      <StyledButtonAddFavorite
        variant="contained"
        onClick={handleAddToFavorite}
      >
        Thêm vào danh sách yêu thích
      </StyledButtonAddFavorite>
      <img src="https://baonguyen.online/LVTN/service.png" alt="" />
    </Box>
  );
}

export default ProductInfo;
