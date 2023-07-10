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

FilterByStyle.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;

function FilterByStyle({ handleValueStyle }) {
  const { gender } = useParams();
  const [styleList, setStyleList] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllStyle(gender);
        setStyleList(
          list.map((x) => ({
            id: x.style_id,
            name: x.style_name,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [gender]);

  const handleChangeStyle = (event) => {
    const { value, checked } = event.target;
    let updatedStyle = [...selectedStyle];

    if (checked) {
      updatedStyle.push(value);
    } else {
      updatedStyle = updatedStyle.filter((category) => category !== value);
    }
    setSelectedStyle(updatedStyle);
  };

  useEffect(() => {
    handleValueStyle(selectedStyle);
  }, [selectedStyle]);

  return (
    <StyledBox>
      <Typography variant="subtitle2">PHONG CÁCH</Typography>

      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {styleList.map((style) => (
          <FormControlLabel
            key={style.id}
            onChange={handleChangeStyle}
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
