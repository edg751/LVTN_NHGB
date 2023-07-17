import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

export default function FilterOrder({ handleFilterOrder }) {
  const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    width: 150px;
  `;
  const StyledBox = styled(Box)`
    display: flex;
    justify-content: flex-end;
  `;
  const StyledSelect = styled(Select)``;
  const [Filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  React.useEffect(() => {
    handleFilterOrder(Filter);
  }, [Filter]);

  return (
    <StyledBox>
      <StyledFormControl>
        <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
        <StyledSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Filter}
          defaultValue="default"
          label="Sắp xếp theo"
          onChange={handleChange}
        >
          <MenuItem value="default">Mặc định</MenuItem>
          <MenuItem value="dateHighToLow">Ngày giảm dần</MenuItem>
          <MenuItem value="idHighToLow">Mã đơn giảm dần</MenuItem>
        </StyledSelect>
      </StyledFormControl>
    </StyledBox>
  );
}
