import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Rating, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import axios from "axios";
import productApi from "api/productApi";
import { useLocation } from "react-router-dom";

const StyledBox = styled(Box)`
  margin-top: 50px;
  text-align: left;
  padding-bottom: 30px;
`;

const StyledButtonReview = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  background-color: #27006f;
  &:hover {
    background-color: #2e135f;
  }
`;

const StyledName = styled.span`
  font-weight: 600;
  line-height: 20px;
`;
const StyledRating = styled(Rating)`
  margin-left: 20px;
  font-size: 20px;
`;
const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledLi = styled.li`
  list-style-type: none;
  padding-bottom: 40px;
`;
const StyledTypographyTitle = styled(Typography)`
  margin-bottom: 35px;
`;
ReviewProduct.propTypes = {};

function ReviewProduct({ handleReview, statusFlag }) {
  const [rateData, setRateData] = useState([]);
  const [statusReview, setStatusReview] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getStatusReview(
          idProduct,
          loggedInUser.user_id
        );
        setStatusReview(
          list.map((x) => ({
            user_id: x.user_id,
            id_product: x.id_product,
          }))
        );

        const ReviewList = await productApi.getReviewList(idProduct);
        setReviewList(
          ReviewList.map((x) => ({
            full_name: x.full_name,
            comments: x.comments,
            score_rating: x.score_rating,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [statusFlag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/rate?productid=1"
        );
        setRateData(response.data);
      } catch (error) {
        console.log("Error fetching rate data:", error);
      }
    };

    fetchData();
  }, []);

  const loggedInUser = useSelector((state) => state.user.current);
  // Nếu nó có id thì là đăng nhập rồi
  const isLoggin = !!loggedInUser.user_id;
  // console.log("isLogin: ", loggedInUser.user_id);

  const handleReviewBtn = () => {
    handleReview();
  };

  return (
    <StyledBox>
      <StyledTypographyTitle variant="h6">Đánh giá</StyledTypographyTitle>
      {/* Cần thêm LOGIC khi mua SP mới đc đánh giá */}
      {isLoggin && statusReview.length !== 0 && (
        <StyledButtonReview onClick={handleReviewBtn} variant="contained">
          Đánh giá sản phẩm
        </StyledButtonReview>
      )}
      {!isLoggin && (
        <StyledButtonReview variant="contained" disabled>
          Đánh giá sản phẩm
        </StyledButtonReview>
      )}
      {isLoggin && statusReview.length === 0 && (
        <StyledButtonReview variant="contained" disabled>
          Đánh giá sản phẩm
        </StyledButtonReview>
      )}

      <ul>
        {reviewList.map((item, index) => (
          <StyledLi key={index}>
            <StyledTypography>
              <StyledName>{item.full_name}</StyledName>
              <StyledRating
                name={`rating-read-${index}`}
                defaultValue={item.score_rating}
                precision={1}
                readOnly
              />
            </StyledTypography>
            <span>{item.comments}</span>
          </StyledLi>
        ))}
      </ul>
    </StyledBox>
  );
}

export default ReviewProduct;
