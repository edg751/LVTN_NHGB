import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import AddQuantity from "features/Product/components/AddQuantity";
import DeleteIcon from "@mui/icons-material/Delete";
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
const handleDeleteItemInCart = () => {
  console.log("Xóa item khỏi cart");
};
function CartPage(props) {
  return (
    <StyledCartBox>
      {/*<> GIỎ HÀNG RỖNG */}
      {/* <Box sx={{ paddingTop: "100px" }}>
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
      </Box> */}
      {/* GIỎ HÀNG RỖNG </>*/}

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
                <Grid item xs={6} md={6}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Link to="/">
                          <StyledImgItem src="https://bizweb.dktcdn.net/thumb/compact/100/438/408/products/ao-polo-nam-apm5413-tpv-4.jpg" />
                        </Link>
                      </Grid>
                      <Grid item xs={6} md={9}>
                        <StyledBoxItemDetail>
                          <StyledLinkDetail to="/">
                            <Typography>
                              Áo Polo Nam Cafe Tổ Ong Phối 3 Màu
                            </Typography>
                          </StyledLinkDetail>
                          <StyledTypographyDetailColorSize>
                            Trắng phối vàng / L
                          </StyledTypographyDetailColorSize>
                        </StyledBoxItemDetail>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledTypographyPrice>379.000đ</StyledTypographyPrice>
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledQuantityItem
                    id="outlined-number"
                    type="number"
                    defaultValue={2}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledTypographyPrice>758.000đ</StyledTypographyPrice>
                  <StyledDeleteIcon
                    onClick={handleDeleteItemInCart}
                  ></StyledDeleteIcon>
                </Grid>
                {/*</> LIST ITEM CART */}
                {/*<> LIST ITEM CART */}
                <Grid item xs={6} md={6}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Link to="/">
                          <StyledImgItem src="https://bizweb.dktcdn.net/thumb/compact/100/438/408/products/ao-polo-nam-apm5413-tpv-4.jpg" />
                        </Link>
                      </Grid>
                      <Grid item xs={6} md={9}>
                        <StyledBoxItemDetail>
                          <StyledLinkDetail to="/">
                            <Typography>
                              Áo Polo Nam Cafe Tổ Ong Phối 3 Màu
                            </Typography>
                          </StyledLinkDetail>
                          <StyledTypographyDetailColorSize>
                            Trắng phối vàng / L
                          </StyledTypographyDetailColorSize>
                        </StyledBoxItemDetail>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledTypographyPrice>379.000đ</StyledTypographyPrice>
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledQuantityItem
                    id="outlined-number"
                    type="number"
                    defaultValue={2}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <StyledTypographyPrice>758.000đ</StyledTypographyPrice>
                  <StyledDeleteIcon
                    onClick={handleDeleteItemInCart}
                  ></StyledDeleteIcon>
                </Grid>
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
                1.257.000đ
              </Typography>
            </StyledBoxTotal>
            <StyledBtnCheckout variant="contained">Đặt hàng</StyledBtnCheckout>
          </Box>
        </Grid>
      </StyeldGridCart>
    </StyledCartBox>
  );
}

export default CartPage;
