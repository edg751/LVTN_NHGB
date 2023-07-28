import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, TextField, Typography } from "@mui/material";
import InputField from "components/form-control/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";

const schema = yup.object().shape({});
const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;
const AddPromotion = () => {
  const [percent, setPercent] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      promotionDescription: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (data) => {
    try {
      data.todate = selectedToDate;
      data.fromdate = selectedFromDate;
      data.percent = percent;
      console.log("Data", data);

      const response = await axiosClient.post(
        "/api/senior-admin/add-promotion",
        data
      );
      console.log("Mã KM vừa thêm", response);

      navigate(`/admin/senior-admin/ProductListPromotion/${response}`);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error registering user:", error);
    }
  };
  const [selectedToDate, setSelectedToDate] = useState("");

  const handleToDateChange = (event) => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().slice(0, 10);
    // Kiểm tra nếu ngày được chọn lớn hơn hoặc bằng ngày hôm nay thì lưu vào state
    if (selectedDate >= today && selectedDate >= selectedFromDate) {
      setSelectedToDate(selectedDate);
    }
  };

  const [selectedFromDate, setSelectedFromDate] = useState("");

  const handleFromDateChange = (event) => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().slice(0, 10);
    if (selectedDate >= today) {
      setSelectedFromDate(selectedDate);
    }
  };
  const handlePercentChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, ""); // Loại bỏ các ký tự không phải số
    const parsedValue = parseInt(sanitizedValue, 10); // Chuyển giá trị sang dạng số nguyên

    // Kiểm tra giá trị nhập vào có nằm trong khoảng từ 1-99 hay không
    if (parsedValue >= 1 && parsedValue <= 99) {
      setPercent(parsedValue); // Lưu giá trị vào state nếu hợp lệ
    }
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
            Thêm khuyến mãi
          </Typography>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField
              name="promotionDescription"
              label="Mô tả khuyến mãi"
              form={form}
            ></InputField>
            <TextField
              name="percent"
              fullWidth
              label="Phần trăm giảm giá"
              type="number"
              value={percent}
              onChange={handlePercentChange}
              inputProps={{
                min: "1", // Giá trị tối thiểu là 1
                max: "99", // Giá trị tối đa là 99
              }}
            ></TextField>
            <TextField
              label="Từ ngày"
              type="date"
              name="selectedDate"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Đến ngày"
              type="date"
              name="selectedDate"
              value={selectedToDate}
              onChange={handleToDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ p: "15px", marginTop: "30px" }}
              fullWidth
            >
              Thêm khuyến mãi
            </Button>
          </form>
        </Container>
      </ContentContainer>
    </RootContainer>
  );
};

export default AddPromotion;
