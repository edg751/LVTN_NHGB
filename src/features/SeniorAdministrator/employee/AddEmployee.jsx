import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import InputField from "components/form-control/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;
const AddEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    let data = {};
    data.fullName = fullName;
    data.address = address;
    data.phone = phone;
    data.email = email;

    let response = await axiosClient.post(`/api/add_employee`, data);
    navigate("/admin/senior-admin/employee");
  };

  return (
    <RootContainer>
      <HeaderSeniorAdmin />

      <CategorySeniorAdmin />
      <ContentContainer>
        {" "}
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            mt={3}
            mb={4}
            sx={{ marginTop: "60px" }}
          >
            Thêm nhân viên
          </Typography>
          <TextField
            label="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="SĐT"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          {/* <FormControlLabel
            control={
              <Checkbox
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            }
            label="Hoạt động"
          /> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: "15px", marginTop: "30px" }}
            onClick={handleFormSubmit}
            fullWidth
          >
            Thêm nhân viên
          </Button>
        </Container>
      </ContentContainer>
    </RootContainer>
  );
};

export default AddEmployee;
