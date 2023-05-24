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

FilterByStyle.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
const changeMaterial = (e) => {
  console.log(e.target.value);
};
function FilterByStyle(props) {
  return (
    <StyledBox>
      <Typography variant="subtitle2">LOẠI VẢI</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          onChange={changeMaterial}
          value={"polyester"}
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
          label="Polyester"
        />
        <FormControlLabel
          onChange={changeMaterial}
          value={"cotton"}
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
          label="Cotton"
        />
        <FormControlLabel
          onChange={changeMaterial}
          value={"denim"}
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
          label="Denim"
        />
        <FormControlLabel
          onChange={changeMaterial}
          value={"kaki"}
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
          label="Kaki"
        />
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByStyle;
