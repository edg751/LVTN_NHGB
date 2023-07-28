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
import dayjs from "dayjs";

const schema = yup.object().shape({});
const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;

const DetailPromotion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idPM = location.pathname.split("/").pop();
  const [detailPromotion, setDetailPromotion] = useState([
    {
      discount_percent: "",
      from_date: "",
      is_active: "",
      promotion_description: "",
      promotion_id: "",
      to_date: "",
    },
  ]);
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState("");
  const [isActive, setIsActive] = useState("");

  const form = useForm({
    defaultValues: {
      promotionDescription: "",
      percent: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/senior-admin/detail-promotion?idPM=${idPM}`
        );
        console.log(list);
        setDescription(list[0].promotion_description);
        setPercent(list[0].discount_percent);

        setSelectedToDate(dayjs(list[0].to_date).format("YYYY-MM-DD"));
        setSelectedFromDate(dayjs(list[0].from_date).format("YYYY-MM-DD"));
        setIsActive(list[0].is_active);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    let data = {};
    data.idPM = idPM;
    data.todate = selectedToDate;
    data.fromdate = selectedFromDate;
    data.description = description;
    data.percent = percent;
    data.status = isActive;
    console.log(data);
    console.log(detailPromotion[0].promotion_description);
    let response = await axiosClient.post(
      "/api/senior-admin/Update-detail-promotion",
      data
    );
    navigate("/admin/senior-admin/promotion");
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

  const handleCheckboxChange = (event) => {
    setIsActive(event.target.checked ? 1 : 0);
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
  const handleContentChange = (event) => {
    setDescription(event.target.value);
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
            Chi tiết khuyến mãi có ID : {idPM}
          </Typography>

          <TextField
            sx={{ marginBottom: "20px" }}
            fullWidth
            name="promotionDescription"
            label="Mô tả khuyến mãi"
            value={description}
            onChange={handleContentChange}
          ></TextField>
          <TextField
            fullWidth
            name="percent"
            label="Phần trăm giảm giá"
            value={percent}
            type="number"
            onChange={handlePercentChange}
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

          <FormControlLabel
            control={
              <Checkbox
                checked={isActive === 1}
                onChange={handleCheckboxChange}
              />
            }
            label="Hoạt động" // Nội dung của checkbox
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: "15px", marginTop: "30px" }}
            fullWidth
            onClick={() => handleSubmit()}
          >
            Cập nhật khuyến mãi
          </Button>
        </Container>
      </ContentContainer>
    </RootContainer>
  );
};

export default DetailPromotion;
