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

function ProductInfo({
  handleSize,
  product,
  handleGetColor,
  handleGetSize,
  handleAddToCartClick,
}) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [statusFavorite, setStatusFavorite] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);

  const [statusFlag, setStatusFlag] = useState();

  const handleChangeColor = (color) => {
    setSelectedColor(color);
    // Lấy cái id
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
  console.log("product", product);
  useEffect(() => {
    (async () => {
      try {
        if (selectedSize === "" && selectedColor === "") {
          const list = await axiosClient(
            `/api/product/quantity?productid=${idProduct}`
          );

          setQuantityProduct(list[0].quantity);
        }
        if (selectedSize !== "" && selectedColor !== "") {
          const list = await axiosClient(
            `/api/product/quantity?productid=${idProduct}&color_id=${selectedColor.color_id}&size_id=${selectedSize.size_id}`
          );

          setQuantityProduct(list[0].quantity);
        }
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [selectedColor, selectedSize]);

  const handleAddToCard = () => {
    handleAddToCartClick(product[0].name);
    const products = {
      name: product[0].name,
      id: idProduct,
      color: selectedColor.color_name,
      color_id: selectedColor.color_id,
      size_id: selectedSize.size_id,
      size: selectedSize.size_name,
      price:
        product[0].promotion_price !== null
          ? product[0].promotion_price
          : product[0].price,
      quantity: parseInt(selectedQuantity, 10),
      image: product[0].images_list[0].pic_link,
    };

    let cart = [];
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
      const existingProductIndex = cart.findIndex(
        (item) =>
          item.id === products.id &&
          item.color_id === products.color_id &&
          item.size_id === products.size_id
      );

      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        cart[existingProductIndex].quantity += products.quantity;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
        cart.push(products);
      }
    } else {
      // Giỏ hàng trống, thêm mới sản phẩm
      cart.push(products);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
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
  console.log("Số sao: ", product[0].rate);

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
        {product[0].promotion_price !== null &&
        new Date(product[0].from_date) <= new Date() &&
        new Date(product[0].to_date) >= new Date() ? (
          <>
            {" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product[0].promotion_price)}
            <strike style={{ color: "#958a9a", marginLeft: "10px" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product[0].price)}
            </strike>{" "}
          </>
        ) : (
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product[0].price)
        )}
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
      <Typography
        sx={{ textAlign: "left", marginLeft: "10px", fontWeight: "bold" }}
      >
        Số lượng còn lại : {quantityProduct}
      </Typography>

      <AddQuantity
        handleQuantityChange={handleQuantityChange}
        quantityProduct={quantityProduct}
      />

      {selectedColor !== "" && selectedSize !== "" && quantityProduct > 0 && (
        <StyledButtonAddCard variant="contained" onClick={handleAddToCard}>
          Thêm vào giỏ hàng
        </StyledButtonAddCard>
      )}
      {selectedColor !== "" && selectedSize !== "" && quantityProduct == 0 && (
        <StyledButtonAddCard
          variant="contained"
          disabled
          onClick={handleAddToCard}
        >
          Thêm vào giỏ hàng
        </StyledButtonAddCard>
      )}

      {(selectedColor === "" || selectedSize === "") && (
        <StyledButtonAddCard
          variant="contained"
          disabled
          onClick={handleAddToCard}
        >
          Thêm vào giỏ hàng
        </StyledButtonAddCard>
      )}

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
