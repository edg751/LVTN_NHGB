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
  display: inline-block;
  vertical-align: "middle";
  margin-right: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;
ColorChoose.propTypes = {};
function ColorChoose({ selectedColor, handleChangeColor, product }) {
  console.log("array ne", product[0]);
  return (
    <StyledBox>
      <Typography>Màu sắc :</Typography>
      {product[0].colors_list.map((color, index) => (
        <label key={index}>
          <input
            type="radio"
            hidden
            name="color"
            value={color.color_name}
            checked={selectedColor === color}
            onChange={() => handleChangeColor(color)}
            
          />
          <StyledColorBox
            style={{
              borderRadius: "2px",
              backgroundColor: color.color_code,
              border:
                selectedColor === color
                  ? "3px solid #fcaf17"
                  : "1px solid black",
            }}
          ></StyledColorBox>
        </label>
      ))}
    </StyledBox>
  );
}

export default ColorChoose;
