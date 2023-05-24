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

const handleChangeColor = (values) => {
  console.log(values.target.value);
};
function FilterByPrice(props) {
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
                value="1"
                control={<Radio style={{ color: "black" }} />}
                label={
                  <span style={{ fontSize: "14px" }}>Nhỏ hơn 100.000đ</span>
                }
                style={{ marginRight: "10px" }}
              />
              <FormControlLabel
                onChange={handleChangeColor}
                value="2"
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
                value="3"
                control={<Radio style={{ color: "black" }} />}
                label={
                  <span style={{ fontSize: "14px" }}>
                    Từ 250.000đ - 500.000đ
                  </span>
                }
              />

              <FormControlLabel
                onChange={handleChangeColor}
                value="4"
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
