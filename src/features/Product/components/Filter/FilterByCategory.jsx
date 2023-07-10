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
import { useParams } from "react-router-dom";

FilterByCategory.propTypes = {};

const StyledBox = styled(Box)`
  padding: 16px;
`;

function FilterByCategory({ handleValueCategory }) {
  const { gender } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllCategory(gender);

        setCategoryList(
          list.map((x) => ({
            id: x.category_id,
            name: x.category_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [gender]);

  const handleChangeCategory = (event) => {
    const { value, checked } = event.target;
    let updatedCategories = [...selectedCategories];

    if (checked) {
      // Nếu checkbox được chọn, thêm giá trị vào selectedCategories
      updatedCategories.push(value);
    } else {
      // Nếu checkbox bị hủy, loại bỏ giá trị khỏi selectedCategories
      updatedCategories = updatedCategories.filter(
        (category) => category !== value
      );
    }
    setSelectedCategories(updatedCategories);
  };

  useEffect(() => {
    handleValueCategory(selectedCategories);
  }, [selectedCategories]);

  return (
    <StyledBox>
      <Typography variant="subtitle2">LOẠI SẢN PHẨM</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {categoryList.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                value={category.name}
                onChange={handleChangeCategory}
                checked={selectedCategories.includes(category.name)}
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
