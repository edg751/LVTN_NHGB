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

function DetailInfomation(props) {
  return (
    <StyledBox>
      <Typography variant="h6">Đặc tính nổi bật</Typography>
      <span>
        Áo thun nam thể thao, thiết kế mới nhất dành cho nam giới Chất vải mềm
        mại, co giãn cực tốt, thấm hút mồ hôi hiệu quả. Áo phù hợp cho các hoạt
        động thể dục thể thao, vận động hàng ngày Thiết kế hình in năng động,
        khoẻ khoắn bảng màu basic dễ phối đồ. NHGB - Look good. Feel good.
      </span>
    </StyledBox>
  );
}

export default DetailInfomation;
