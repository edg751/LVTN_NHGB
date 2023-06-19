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

FilterByColor.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
function FilterByColor(props) {
  const color = { black: "black", white: "white" };
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllColor(0);
        setColorList(
          list.data.map((x) => ({
            id: x.detail_id,
            name: x.color,
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
      <Typography variant="subtitle2">MÀU SẮC</Typography>

      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {colorList.map((color) => (
          <FormControlLabel
            key={color.id}
            onChange={null}
            value={color.name}
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
            label={color.name}
          />
        ))}
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByColor;
