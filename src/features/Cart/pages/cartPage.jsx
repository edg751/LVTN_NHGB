import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import AddQuantity from "features/Product/components/AddQuantity";
import DeleteIcon from "@mui/icons-material/Delete";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { useSelector } from "react-redux";
CartPage.propTypes = {};
const StyledDeleteIcon = styled(DeleteIcon)`
  margin-top: 50px;
  cursor: pointer;
`;
const StyledCartBox = styled(Box)`
  min-height: 500px;
`;
const StyeldGridCart = styled(Grid)`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
`;
const StyledBoxTotal = styled(Paper)`
  display: flex;
  justify-content: space-around;
  padding: 20px 0px;
`;

const StyledBoxItem = styled(Paper)`
  padding: 20px 0px;
`;
const StyledBtnCheckout = styled(Button)`
  background-color: #fcaf17;
  padding: 10px 100px;
  margin-top: 30px;
  &:hover {
    background-color: #fcaf17;
    color: black;
  }
`;
const StyledImgItem = styled.img`
  margin-left: 20px;
  border-radius: 5px;
  width: 100%;
`;
const StyledBoxItemDetail = styled(Box)`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledLinkDetail = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  text-align: left;
  color: black;
  font-weight: 500;
  &:hover {
    color: #fcaf17;
  }
`;
const StyledTypographyDetailColorSize = styled(Typography)`
  text-align: left;
  margin-left: 20px;
`;
const StyledTypographyPrice = styled(Typography)`
  text-align: left;
  font-weight: 500;
`;
const StyledQuantityItem = styled(TextField)`
  width: 75px;
  margin-left: -50px;
`;
function CartPage(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  // Nếu nó có id thì là đăng nhập rồi

  const isLoggin = loggedInUser && loggedInUser.user_id ? true : null;
  // console.log("isLogin: ", loggedInUser.user_id);
  const [savedCartItems, setSavedCartItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setSavedCartItems(cartItems);
    console.log(savedCartItems);
  }, []);

  const [open, setOpen] = React.useState(false);
  const totalPrice = savedCartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const MODE = {
    login: "login",
    register: "register",
  };

  const [mode, setMode] = React.useState(MODE.login);

  const handleClose = () => {
    setOpen(false);
    setMode(MODE.login);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteItemInCart = (index) => {
    const updatedCartItems = [...savedCartItems];
    updatedCartItems.splice(index, 1); // Xóa sản phẩm tại vị trí index trong mảng
    setSavedCartItems(updatedCartItems); // Cập nhật state giỏ hàng

    // Lưu lại giỏ hàng mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };
  const handleQuantityChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0 && newQuantity <= 99) {
      const savedCartItems = JSON.parse(localStorage.getItem("cart"));
      savedCartItems[index].quantity = newQuantity;

      localStorage.setItem("cart", JSON.stringify(savedCartItems));
      setSavedCartItems(savedCartItems); // Cập nhật state giỏ hàng
    } else {
      // Nếu giá trị không nằm trong khoảng từ 1 đến 99, cập nhật lại trường số lượng với giá trị mặc định
      const defaultValue = savedCartItems[index].quantity;
      event.target.value = defaultValue;
    }
  };

  return (
    <StyledCartBox>
      {/* <> GIỎ HÀNG RỖNG */}
      {savedCartItems.length === 0 && (
        <Box sx={{ paddingTop: "100px" }}>
          <RemoveShoppingCartIcon
            sx={{ fontSize: "100px", color: "#7a7a9d" }}
          ></RemoveShoppingCartIcon>
          <Typography sx={{ color: "#7a7a9d" }}>
            Giỏ hàng của bạn trống
          </Typography>
          <Link to="/products">
            <Button
              variant="outlined"
              sx={{
                color: "#7a7a9d",
                fontSize: "16px",
                padding: "10px 110px",
                marginTop: "20px",
              }}
            >
              Mua ngay
            </Button>
          </Link>
        </Box>
      )}
      {/* GIỎ HÀNG RỖNG </> */}

      {savedCartItems.length !== 0 && (
        <StyeldGridCart container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              <StyledBoxItem elevation={0}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "left",
                    paddingLeft: "20px",
                    fontWeight: "500",
                    paddingBottom: "40px",
                  }}
                >
                  GIỎ HÀNG
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontWeight: "500",
                        paddingLeft: "20px",
                      }}
                    >
                      Sản phẩm
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
                      Đơn giá
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
                      Số lượng
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
                      Tổng tiền
                    </Typography>
                  </Grid>

                  {/*<> LIST ITEM CART */}
                  {/*  */}
                  {savedCartItems.map((item, index) => (
                    <Box sx={{ display: "flex" }} key={index}>
                      <Grid item xs={6} md={6}>
                        <Box>
                          <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                              <Link to="/">
                                <StyledImgItem src={item.image} />
                              </Link>
                            </Grid>
                            <Grid item xs={6} md={9}>
                              <StyledBoxItemDetail>
                                <StyledLinkDetail to="/">
                                  <Typography>{item.name}</Typography>
                                </StyledLinkDetail>
                                <StyledTypographyDetailColorSize>
                                  {`${item.color} / ${item.size}`}
                                </StyledTypographyDetailColorSize>
                              </StyledBoxItemDetail>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={6} md={2}>
                        <StyledTypographyPrice>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </StyledTypographyPrice>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <StyledQuantityItem
                          id="outlined-number"
                          type="number"
                          defaultValue={item.quantity}
                          onChange={(event) =>
                            handleQuantityChange(event, index)
                          }
                        />
                      </Grid>

                      <Grid item xs={6} md={2}>
                        <StyledTypographyPrice>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.quantity * item.price)}
                        </StyledTypographyPrice>
                        <StyledDeleteIcon
                          onClick={() => handleDeleteItemInCart(index)}
                        />
                      </Grid>
                    </Box>
                  ))}
                  {/*  */}

                  {/*</> LIST ITEM CART */}
                </Grid>
              </StyledBoxItem>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <StyledBoxTotal elevation={0}>
                <Typography sx={{ fontWeight: "500" }}>
                  Tổng đơn hàng (Tạm tính) :
                </Typography>
                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </Typography>
              </StyledBoxTotal>

              {!isLoggin && (
                <>
                  <StyledBtnCheckout
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Đặt hàng
                  </StyledBtnCheckout>
                </>
              )}

              {isLoggin && (
                <>
                  <Link to="/cart/detail">
                    <StyledBtnCheckout
                      variant="contained"
                      onClick={handleClickOpen}
                    >
                      Đặt hàng
                    </StyledBtnCheckout>
                  </Link>
                </>
              )}
            </Box>
          </Grid>

          {/* LOGIN */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableEscapeKeyDown
          >
            <DialogContent>
              {mode == MODE.login && (
                <>
                  <Login closeDialog={handleClose} />
                  <Box textAlign="center" mt={"10px"}>
                    <Button onClick={() => setMode(MODE.register)}>
                      Chưa có tài khoản ? Đăng ký ngay.
                    </Button>
                  </Box>
                </>
              )}

              {mode == MODE.register && (
                <>
                  <Register closeDialog={handleClose} />
                  <Box textAlign="center" mt={"10px"}>
                    <Button onClick={() => setMode(MODE.login)}>
                      Đã có tài khoản ? Đăng nhập ngay.
                    </Button>
                  </Box>
                </>
              )}
            </DialogContent>
          </Dialog>
        </StyeldGridCart>
      )}
    </StyledCartBox>
  );
}

export default CartPage;
