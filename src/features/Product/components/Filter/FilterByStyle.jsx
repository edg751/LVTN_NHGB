import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import categoryApi from "api/categoriesApi";

FilterByStyle.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
const changeStyle = (e) => {
  console.log(e.target.value);
};
function FilterByStyle(props) {
  const [styleList, setStyleList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllStyle(0);
        setStyleList(
          list.data.map((x) => ({
            id: x.style_id,
            name: x.style_name,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  return (
    <StyledBox>
      <Typography variant="subtitle2">PHONG CÁCH</Typography>

      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {styleList.map((style) => (
          <FormControlLabel
            key={style.id}
            onChange={changeStyle}
            value={style.name}
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
            label={style.name}
          />
        ))}
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByStyle;
