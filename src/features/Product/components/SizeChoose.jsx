import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`;

const StyledColorBox = styled.span`
  margin-top: 10px;
  width: 30px;
  height: 30px;
  border: 1px black solid;
  display: inline-block;
  vertical-align: "middle";
  text-align: center;
  margin-right: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

SizeChoose.propTypes = {};
function SizeChoose({ selectedSize, handleChangeSize, size }) {
  return (
    <StyledBox>
      <Typography>Kích thước :</Typography>
      {size[0].sizes.map((size, index) => (
        <label key={index}>
          <input
            type="radio"
            hidden
            name="size"
            value="S"
            checked={selectedSize === size}
            onChange={() => handleChangeSize(size)}
            // disabled={size.quantitySize <= 0}
          />
          <StyledColorBox
            style={{
              lineHeight: "25px",
              fontWeight: 600,
              borderRadius: "2px",
              backgroundColor: selectedSize === size ? "#fcaf17" : "white",
              color: selectedSize === size ? "white" : "black",
              opacity: size <= 0 ? "0.3" : "1",
            }}
          >
            {size.size}
          </StyledColorBox>
        </label>
      ))}
    </StyledBox>
  );
}

export default SizeChoose;
