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
const changeStyle = (e) => {
  console.log(e.target.value);
};
function FilterByStyle(props) {
  return (
    <StyledBox>
      <Typography variant="subtitle2">PHONG CÁCH</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          onChange={changeStyle}
          value={"thanhlich"}
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
          label="Thanh lịch"
        />
        <FormControlLabel
          onChange={changeStyle}
          value={"dethuong"}
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
          label="Dễ thương"
        />
        <FormControlLabel
          onChange={changeStyle}
          value={"datiec"}
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
          label="Dạ tiệc"
        />
        <FormControlLabel
          onChange={changeStyle}
          value={"catinh"}
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
          label="Cá tính"
        />
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByStyle;
