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

FilterByMaterial.propTypes = {};

const StyledBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
`;
const changeMaterial = (e) => {
  console.log(e.target.value);
};
function FilterByMaterial(props) {
  const [materialList, setMaterialList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllMaterial(0);
        setMaterialList(
          list.data.map((x) => ({
            id: x.material_id,
            name: x.material_name,
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
      <Typography variant="subtitle2">LOẠI VẢI</Typography>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {materialList.map((material) => (
          <FormControlLabel
            key={material.id}
            onChange={changeMaterial}
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
