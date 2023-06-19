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
  return (
    <Box>
      <Box>
        <StyledGridContainerItem container spacing={2}>
          <Grid item xs={6} md={3}>
            <Styledimg
              src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-4.jpg?v=1652520442737"
              alt=""
            />
            <StyledSpanQuantity>2</StyledSpanQuantity>
          </Grid>
          <Grid item xs={6} md={6}>
            <StyledTypographyItemName>
              Áo Polo Nam Cafe Tổ Ong Phối 3 Màu - Màu : Xanh - Size : S
            </StyledTypographyItemName>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledTypographyPrice>758.000đ</StyledTypographyPrice>
          </Grid>
        </StyledGridContainerItem>

        <StyledGridContainerItem container spacing={2}>
          <Grid item xs={6} md={3}>
            <Styledimg
              src="https://bizweb.dktcdn.net/100/438/408/products/qam3127-tit-2.jpg?v=1673576976963"
              alt=""
            />
            <StyledSpanQuantity>1</StyledSpanQuantity>
          </Grid>
          <Grid item xs={6} md={6}>
            <StyledTypographyItemName>
              Quần Âu Nam Cao Cấp Giữ Phom, Co Giãn Thoải Mái - Màu : Tím than -
              Size : S
            </StyledTypographyItemName>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledTypographyPrice>758.000đ</StyledTypographyPrice>
          </Grid>
        </StyledGridContainerItem>
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
            <Typography>2.105.000đ</Typography>
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
              2.105.000đ
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CartDetailItemList;
