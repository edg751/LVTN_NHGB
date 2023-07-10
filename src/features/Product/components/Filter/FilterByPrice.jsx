import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

FilterByPrice.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  margin-left: 10px;
  list-style-type: none;
  & > li {
    margin: 0;
    margin-top: "8px";
    transition: all 0.25s;

    border-radius: 10px;

    /* &:hover {
      cursor: pointer;
      color: #27006f;
      background-color: #fae1ae;
      border-radius: 5px;
    } */
  }
`;

function FilterByPrice({ handleValuePrice }) {
  const handleChangeColor = (values) => {
    handleValuePrice(values.target.value);
  };
  return (
    <StyledBox>
      <Typography variant="subtitle2">GIÁ</Typography>
      <StyledUl>
        <li>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              name="radio-buttons-group"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                onChange={handleChangeColor}
                value="lessThan100k"
                control={<Radio style={{ color: "black" }} />}
                label={
                  <span style={{ fontSize: "14px" }}>Nhỏ hơn 100.000đ</span>
                }
                style={{ marginRight: "10px" }}
              />
              <FormControlLabel
                onChange={handleChangeColor}
                value="100kTo250k"
                control={<Radio style={{ color: "black" }} />}
                label={
                  <span style={{ fontSize: "14px" }}>
                    Từ 100.000đ - 250.000đ
                  </span>
                }
                style={{ marginRight: "10px" }}
              />
              <FormControlLabel
                onChange={handleChangeColor}
                value="250kTo500k"
                control={<Radio style={{ color: "black" }} />}
                label={
                  <span style={{ fontSize: "14px" }}>
                    Từ 250.000đ - 500.000đ
                  </span>
                }
              />

              <FormControlLabel
                onChange={handleChangeColor}
                value="greaterThan500k"
                control={<Radio style={{ color: "black" }} />}
                label={<span style={{ fontSize: "14px" }}>Trên 500.000đ</span>}
              />
            </RadioGroup>
          </FormControl>
        </li>
      </StyledUl>
    </StyledBox>
  );
}

export default FilterByPrice;
