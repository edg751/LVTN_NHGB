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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";
import { Axios } from "axios";

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;
const DetailEmployee = () => {
  const location = useLocation();
  const Employeeid = location.pathname.split("/").pop();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/employee_detail?id=${Employeeid}`
        );

        setFullName(list[0].full_name);
        setAddress(list[0].address);
        setPhone(list[0].phone_number);
        setEmail(list[0].email);
        setStatus(list[0].is_active ? 1 : 0);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleFormSubmit = async () => {
    const statusValue = status ? 1 : 0;
    let data = {};
    data.fullName = fullName;
    data.address = address;
    data.phone = phone;
    data.email = email;
    data.status = statusValue;
    data.id = Employeeid;
    let response = await axiosClient.post("/api/update_employee", data);
    console.log(data);
    navigate("/admin/senior-admin/employee");
  };

  const handleResetPassword = async () => {
    let response = await axiosClient.get(
      `/api/resetPass_employee?id=${Employeeid}&email=${email}`
    );
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
            Chi tiết nhân viên có mã {Employeeid}
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

          <FormControlLabel
            control={
              <Checkbox
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            }
            label="Hoạt động"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: "15px", marginTop: "30px" }}
            onClick={handleFormSubmit}
            fullWidth
          >
            Cập nhật
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: "15px", marginTop: "30px" }}
            onClick={handleResetPassword}
            fullWidth
          >
            Reset mật khẩu
          </Button>
        </Container>
      </ContentContainer>
    </RootContainer>
  );
};

export default DetailEmployee;
