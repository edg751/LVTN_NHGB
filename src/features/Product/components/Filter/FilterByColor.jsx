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

FilterByColor.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
function FilterByColor({ handleValueColor }) {
  const { gender } = useParams();

  const [colorList, setColorList] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllColor(gender);
        setColorList(
          list.map((x) => ({
            id: x.color_id,
            name: x.color_name,
            code: x.color_code,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [gender]);

  const handleChangeColor = (event) => {
    const { value, checked } = event.target;
    let updatedColors = [...selectedColors];

    if (checked) {
      // Nếu checkbox được chọn, thêm giá trị vào
      updatedColors.push(value);
    } else {
      // Nếu checkbox bị hủy, loại bỏ giá trị khỏi
      updatedColors = updatedColors.filter((color) => color !== value);
    }
    setSelectedColors(updatedColors);
  };

  useEffect(() => {
    handleValueColor(selectedColors);
  }, [selectedColors]);

  return (
    <StyledBox>
      <Typography variant="subtitle2">MÀU SẮC</Typography>

      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {colorList.map((color) => (
          <FormControlLabel
            key={color.id}
            control={
              <Checkbox
                onChange={handleChangeColor}
                value={color.name}
                checked={selectedColors.includes(color.name)}
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
