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

FilterByCategory.propTypes = {};

const StyledBox = styled(Box)`
  padding: 16px;
`;

function FilterByCategory(props) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllCategory(0);
        setCategoryList(
          list.data.map((x) => ({
            id: x.category_id,
            name: x.category_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  return (
    <StyledBox>
      <Typography variant="subtitle2">LOẠI SẢN PHẨM</Typography>

      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {categoryList.map((category) => (
          <FormControlLabel
            key={category.id}
            onChange={null}
            value={category.name}
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
            label={category.name}
          />
        ))}
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByCategory;
