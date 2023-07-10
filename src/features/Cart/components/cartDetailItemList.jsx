import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

CartDetailItemList.propTypes = {};
const Styledimg = styled.img`
  width: 40%;
  border-radius: 5px;
`;
const StyledSpanQuantity = styled.span`
  background-color: #fcaf17;
  padding: 0 10px;
  font-size: 14px;
  border-radius: 50%;
  margin-left: -10px;
`;
const StyledTypographyItemName = styled(Typography)`
  text-align: left;
  font-size: 14px;
`;
const StyledGridContainerItem = styled(Grid)`
  padding: 10px 0px;
`;
const StyledTypographyPrice = styled(Typography)`
  font-weight: 600;
  margin-top: 10px;
`;
function CartDetailItemList(props) {
  const cartData = JSON.parse(localStorage.getItem("cart"));

  const totalPrice = cartData.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <Box>
      <Box>
        {cartData.map((item, index) => (
          <StyledGridContainerItem container spacing={2} key={index}>
            <Grid item xs={6} md={3}>
              <Styledimg src={item.image} alt="" />
              <StyledSpanQuantity>{item.quantity}</StyledSpanQuantity>
            </Grid>
            <Grid item xs={6} md={6}>
              <StyledTypographyItemName>
                Tên sản phẩm : {item.name} - Màu : {item.color} - Size :{" "}
                {item.size}
              </StyledTypographyItemName>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTypographyPrice>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.quantity * item.price)}
              </StyledTypographyPrice>
            </Grid>
          </StyledGridContainerItem>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <TextField fullWidth id="outlined-required" label="Mã giảm giá" />
          </Grid>
          <Grid item xs={6} md={4}>
            <Button fullWidth sx={{ height: "100%" }} variant="contained">
              Áp dụng
            </Button>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography sx={{ textAlign: "left" }}>Tạm tính</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography>
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography sx={{ textAlign: "left" }}>Phí vận chuyển</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography>Miễn phí</Typography>
          </Grid>

          <Grid item xs={6} md={8}>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "18px",
                textAlign: "left",
                marginTop: "7px",
              }}
            >
              Tổng cộng
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "18px", marginTop: "7px" }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CartDetailItemList;
