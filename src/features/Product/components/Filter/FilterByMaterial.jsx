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

FilterByMaterial.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
const changeMaterial = (e) => {
  console.log(e.target.value);
};
function FilterByMaterial({ handleValueMaterial }) {
  const [selectedMaterial, setSelectedCategories] = useState([]);

  const { gender } = useParams();

  const [materialList, setMaterialList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllMaterial(gender);
        setMaterialList(
          list.map((x) => ({
            id: x.material_id,
            name: x.material_name,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [gender]);

  const handleChangeMaterial = (event) => {
    const { value, checked } = event.target;
    let updatedMaterial = [...selectedMaterial];

    if (checked) {
      // Nếu checkbox được chọn, thêm giá trị vào selectedCategories
      updatedMaterial.push(value);
    } else {
      // Nếu checkbox bị hủy, loại bỏ giá trị khỏi selectedCategories
      updatedMaterial = updatedMaterial.filter(
        (category) => category !== value
      );
    }
    setSelectedCategories(updatedMaterial);
  };

  useEffect(() => {
    handleValueMaterial(selectedMaterial);
  }, [selectedMaterial]);

  return (
    <StyledBox>
      <Typography variant="subtitle2">LOẠI VẢI</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {materialList.map((material) => (
          <FormControlLabel
            key={material.id}
            onChange={handleChangeMaterial}
            value={material.name}
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
            label={material.name}
          />
        ))}
      </FormGroup>
    </StyledBox>
  );
}

export default FilterByMaterial;
