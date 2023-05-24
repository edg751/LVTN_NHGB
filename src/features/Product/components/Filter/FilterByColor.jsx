import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

FilterByColor.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
function FilterByColor(props) {
  return (
    <StyledBox>
      <Typography variant="subtitle2">MÀU SẮC</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label="Đen"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "#c7c7c7",
                },
              }}
            />
          }
          label="Trắng"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "red",
                },
              }}
            />
          }
          label="Đỏ"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "green",
                },
              }}
            />
          }
          label="Xanh lá"
        />
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByColor;
