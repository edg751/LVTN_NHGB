import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)`
  min-height: 400px;
  width: 100%;
  background-color: #27006f;
  padding-bottom: 30px;
`;

const StyledLi = styled.li`
  list-style-type: none;
  text-align: left;
  margin-top: 7px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 16px;
  &:hover {
    color: #fec200;
  }
`;
const StyledTypography = styled(Typography)`
  text-align: left;
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -15px;
`;
Bottom.propTypes = {};

function Bottom(props) {
  return (
    <StyledBox>
      <Grid container spacing={2} display="flex" justifyContent="center">
        <Grid item xs={6} md={3} sx={{ margin: "0 20px" }}>
          <Box>
            <Typography sx={{ color: "white" }}>
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng NHGB tiến bước
            </Typography>
            <Box>
              <StyledLink to="youtube.com">
                <YouTubeIcon sx={{ fontSize: "50px" }} />
              </StyledLink>
              <StyledLink to="facebook.com">
                <FacebookIcon sx={{ fontSize: "50px" }} />
              </StyledLink>
              <StyledLink to="twitter.com">
                <TwitterIcon sx={{ fontSize: "50px" }} />
              </StyledLink>
              <StyledLink to="instagram.co">
                <InstagramIcon sx={{ fontSize: "50px" }} />
              </StyledLink>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={2} sx={{ margin: "0 20px" }}>
          <Box>
            <StyledTypography sx={{ color: "white" }}>VỀ NHGB</StyledTypography>
            <StyledLi>
              <StyledLink to="/">Giới thiệu</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Liên hệ</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Tuyển dụng</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Tin tức</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Hệ thống cửa hàng</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Hàng mới về</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Ưu đãi hàng Outlet</StyledLink>
            </StyledLi>
          </Box>
        </Grid>

        <Grid item xs={6} md={2} sx={{ margin: "0 20px" }}>
          <Box>
            <StyledTypography sx={{ color: "white" }}>
              HỖ TRỢ KHÁCH HÀNG
            </StyledTypography>
            <StyledLi>
              <StyledLink to="/">Hướng dẫn chọn size</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Chính sách khách hàng thân thiết</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Chính sách bảo hành, đổi/trả</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Chính sách bảo mật</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Thanh toán, giao nhận</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Chính sách Đồng phục</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">
                Chính sách bảo mật thông tin khách hàng
              </StyledLink>
            </StyledLi>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} sx={{ margin: "0 20px" }}>
          <Box>
            <StyledTypography sx={{ color: "white" }}>
              CÔNG TY CP THỜI TRANG NHGB
            </StyledTypography>
            <StyledLi>
              <StyledLink to="/">Mã số thuế: 0801206940</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">
                Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải Dương -
                Hải Dương
              </StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Tìm cửa hàng gần bạn nhất</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Liên hệ đặt hàng: 024 999 86 999</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Thắc mắc đơn hàng: 024 999 86 999</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Góp ý khiếu nại: 1800 2086</StyledLink>
            </StyledLi>
            <StyledLi>
              <StyledLink to="/">Email: chamsockhachhang@NHGB.vn</StyledLink>
            </StyledLi>
            <StyledLi>
              <img
                width="30%"
                src="//bizweb.dktcdn.net/100/438/408/themes/904142/assets/logo_bct.png?1685607257573"
                alt=""
              />
              <img
                width="30%"
                src="https://images.dmca.com/Badges/_dmca_premi_badge_5.png?ID=d3a2c2c5-a581-451b-b7ff-ff08fee58d6a"
                alt=""
              />
            </StyledLi>
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{
          color: "white",
          borderTop: "1px solid white",
          padding: "10px",
          marginTop: "30px",
        }}
      >
        © NHGB - Bản quyền thuộc về Công ty cổ phần thời trang NHGB
      </Typography>
    </StyledBox>
  );
}

export default Bottom;
