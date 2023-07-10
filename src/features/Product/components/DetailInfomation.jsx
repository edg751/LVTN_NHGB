import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  margin-top: 50px;
  border-top: 1px solid #d8d7d7;
  border-bottom: 1px solid #d8d7d7;

  padding-top: 30px;
  text-align: left;
  padding-bottom: 30px;
`;
DetailInfomation.propTypes = {};

function DetailInfomation({ product }) {
  console.log("description", product[0].des);
  return (
    <StyledBox>
      <Typography variant="h6">Đặc tính nổi bật</Typography>
      <span>{product[0].des}</span>
    </StyledBox>
  );
}

export default DetailInfomation;
