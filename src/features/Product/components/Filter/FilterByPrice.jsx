import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
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

    &:hover {
      cursor: pointer;
      color: #27006f;
      background-color: #fae1ae;
      border-radius: 5px;
    }
  }
`;

const StyledLabel = styled.span`
  font-size: 14px;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  display: flex;
  align-items: center;
`;
function FilterByPrice(props) {
  return (
    <StyledBox>
      <Typography variant="subtitle2">GIÁ</Typography>
      <StyledUl>
        <li>
          <CustomFormControlLabel
            control={
              <Checkbox
                checked={false}
                onChange={null}
                name={1000}
                color="primary"
              />
            }
            label={<StyledLabel>Nhỏ hơn 100.000đ</StyledLabel>}
          />
        </li>

        <li>
          <CustomFormControlLabel
            control={
              <Checkbox
                checked={false}
                onChange={null}
                name={1000}
                color="primary"
              />
            }
            label={<StyledLabel> Từ 500.000đ - 700.000đ</StyledLabel>}
          />
        </li>
      </StyledUl>
    </StyledBox>
  );
}

export default FilterByPrice;
