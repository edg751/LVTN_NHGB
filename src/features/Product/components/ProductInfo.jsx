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
import { useLocation, useParams } from "react-router-dom";
import productApi from "api/productApi";
import { useSelector } from "react-redux";
import axiosClient from "api/axiosClient";

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

const StyledButtonRemoveFavorite = styled(Button)`
  width: 96%;
  height: 40px;
  background-color: #ce3434;
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

function ProductInfo({ handleSize, product, handleGetColor, handleGetSize }) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [statusFavorite, setStatusFavorite] = useState([]);
  const [statusFlag, setStatusFlag] = useState();

  const handleChangeColor = (color) => {
    setSelectedColor(color);
    handleGetColor(color.color_id);
  };

  const handleChangeSize = (size) => {
    setSelectedSize(size);
    console.log("Size trong Product Detail: ", size);
    handleGetSize(size.size_id);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
    console.log("SL trong product Detail: ", quantity);
  };
  const handleSizeHelp = () => {
    handleSize();
  };

  const handleAddToCard = () => {
    const products = {
      name: product[0].name,
      id: product[0].id, // Đảm bảo rằng product[0] chính là đối tượng sản phẩm bạn muốn lưu trữ id
      color: selectedColor.color_name,
      color_id: selectedColor.color_id,
      size_id: selectedSize.size_id,
      size: selectedSize.size_name,
      price: product[0].price,
      quantity: parseInt(selectedQuantity, 10),
      image: product[0].images_list[0].pic_link,
    };
    console.log(products);
    let cart = [];
    // Kiểm tra xem đã có dữ liệu trong local storage hay chưa
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart); // Lấy dữ liệu từ local storage nếu đã tồn tại
    }
    cart.push(products); // Thêm sản phẩm vào giỏ hàng
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào local storage
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getStatusFavorite(
          loggedInUser.user_id,
          idProduct
        );
        setStatusFavorite(
          list.map((x) => ({
            wish_list_id: x.wish_list_id,
            user_id: x.user_id,
            id_product: x.id_product,
          }))
        );
        console.log("list", list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [statusFlag]);

  const handleAddToFavorite = async () => {
    console.log("id pd", idProduct);
    console.log("id user", loggedInUser.user_id);
    let data = {};
    data.idProduct = idProduct;
    data.user_id = loggedInUser.user_id;
    try {
      const response = await axiosClient.post("/api/addFavorite", data);
      setStatusFlag(Date.now());
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemoveFavorite = async () => {
    console.log("id pd", idProduct);
    console.log("id user", loggedInUser.user_id);
    let data = {};
    data.idProduct = idProduct;
    data.user_id = loggedInUser.user_id;

    try {
      const response = await axiosClient.post("/api/removeFavorite", data);
      setStatusFlag(Date.now());
    } catch (e) {
      console.log(e);
    }
  };

  const loggedInUser = useSelector((state) => state.user.current);
  // Nếu nó có id thì là đăng nhập rồi

  const isLoggin = loggedInUser && loggedInUser.user_id ? true : null;
  console.log("length: ", statusFavorite.length);

  return (
    <Box>
      <StyledTypographyName>{product[0].name}</StyledTypographyName>
      <StyledBoxDetail>
        <StyledProductId>Mã sản phẩm : {product[0].id}</StyledProductId>
        <StyledProductSold>Đã bán : {product[0].sold}</StyledProductSold>
        <StyledProductRating
          name="half-rating-read"
          defaultValue={product[0].rate}
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
        product={product}
        selectedColor={selectedColor}
        handleChangeColor={handleChangeColor}
      />
      <SizeChoose
        product={product}
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

      {isLoggin && statusFavorite.length === 0 && (
        <StyledButtonAddFavorite
          variant="contained"
          onClick={handleAddToFavorite}
        >
          Thêm vào danh sách yêu thích
        </StyledButtonAddFavorite>
      )}

      {isLoggin && statusFavorite.length !== 0 && (
        <StyledButtonRemoveFavorite
          variant="contained"
          onClick={handleRemoveFavorite}
        >
          Bỏ khỏi danh sách yêu thích
        </StyledButtonRemoveFavorite>
      )}

      {!isLoggin && (
        <StyledButtonAddFavorite
          variant="contained"
          onClick={handleAddToFavorite}
          disabled
        >
          Thêm vào danh sách yêu thích
        </StyledButtonAddFavorite>
      )}

      <img src="https://baonguyen.online/LVTN/service.png" alt="" />
    </Box>
  );
}

export default ProductInfo;
