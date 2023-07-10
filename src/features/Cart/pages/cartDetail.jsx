import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import InputField from "components/form-control/InputField";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CartDetailItemList from "../components/cartDetailItemList";
import userApi from "api/userApi";
import { register } from "features/Auth/userSlice";
import { useDispatch } from "react-redux";
import axiosClient from "api/axiosClient";

const StyledGridContainer = styled(Grid)`
  margin-left: auto;
  margin-right: auto;
  width: 1600px;
`;
const StyledFormControlAddress = styled(FormControl)`
  width: 100%;
  margin: 10px 0;
  text-align: left;
`;
CartDetail.propTypes = {};

function CartDetail(props) {
  const [dataUser, setDataUser] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [cityAndDistrict, setCityAndDistrict] = useState("");
  const [ward, setWard] = useState("");

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      email: "",
      address: "",
      name: "",
      numberphone: "",
    },
    resolver: yupResolver(schema),
  });

  const cartData = JSON.parse(localStorage.getItem("cart"));

  const totalPrice = cartData.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (cityCode) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
      );
      setDistricts(response.data.districts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      setWards(response.data.wards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (event) => {
    const selectedCityCode = event.target.value;
    setSelectedCity(selectedCityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    fetchDistricts(selectedCityCode);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrict(selectedDistrictCode);
    setSelectedWard("");
    fetchWards(selectedDistrictCode);
  };

  const handleWardChange = (event) => {
    const selectedWardCode = event.target.value;
    setSelectedWard(selectedWardCode);
    printResult();
  };
  const printResult = () => {
    const selectedCityName = cities.find(
      (city) => city.code === selectedCity
    )?.name;
    const selectedDistrictName = districts.find(
      (district) => district.code === selectedDistrict
    )?.name;
    const result = `${selectedCityName}, ${selectedDistrictName}`;
    console.log("Địa chỉ: ", result);
    setCityAndDistrict(result);
  };
  const handleWardClick = (e) => {
    console.log(e.target.outerText);
    setWard(e.target.outerText);
  };

  //Vì phải đợi để có trạng thái isSubmitting nên ta thêm async
  const handleSubmit = async (data) => {
    // Xử lý dữ liệu người dùng sau khi bấm Đặt hàng
    data.address += `, ${ward}, ${cityAndDistrict}`;
    console.log("huhu", data); // In ra thông tin người dùng nhập vào form

    try {
      const userData = {
        email: "", // Thêm giá trị email của người dùng
        password: "", // Thêm giá trị password của người dùng
        fullname: "Lam", // Thêm giá trị fullname của người dùng
        // Các thuộc tính khác của người dùng
      };

      data.totalprice = totalPrice;
      data.cartdata = cartData;
      console.log("data User:", data);

      const response = await axiosClient.post("/api/order", data);
      // Xử lý dữ liệu trả về sau khi đăng ký thành công
      console.log("User registered:", response);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error registering user:", error);
    }
  };

  return (
    <Box sx={{ marginTop: "50px", paddingBottom: "100px" }}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <StyledGridContainer container spacing={2}>
          <Grid item xs={6} md={4}>
            <Box>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", paddingBottom: "15px" }}
              >
                {" "}
                Thông tin giao hàng
              </Typography>
              <InputField
                name="name"
                label="Họ và tên"
                form={form}
              ></InputField>

              <InputField
                name="numberphone"
                label="Số điện thoại"
                type="number"
                form={form}
              ></InputField>

              <InputField
                name="address"
                label="Địa chỉ"
                form={form}
              ></InputField>

              <StyledFormControlAddress>
                <InputLabel>Tỉnh thành</InputLabel>
                <Select value={selectedCity} onChange={handleCityChange}>
                  {cities.map((city) => (
                    <MenuItem key={city.code} value={city.code}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControlAddress>

              <StyledFormControlAddress>
                <InputLabel>Quận huyện</InputLabel>
                <Select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  {districts.map((district) => (
                    <MenuItem key={district.code} value={district.code}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControlAddress>

              <StyledFormControlAddress>
                <InputLabel>Phường xã</InputLabel>
                <Select value={selectedWard} onChange={handleWardChange}>
                  {wards.map((ward) => (
                    <MenuItem
                      key={ward.code}
                      value={ward.name}
                      onClick={handleWardClick}
                    >
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControlAddress>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", paddingBottom: "30px" }}
              >
                Đặt hàng
              </Typography>
              <RadioGroup
                sx={{
                  border: "solid 1px #d9d9d9",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                form={form}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng (COD)"
                />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label="Thanh toán qua VNPAY"
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              Đơn hàng
            </Typography>
            <CartDetailItemList></CartDetailItemList>
            <Button
              type="submit"
              disabled={form.isSubmitting}
              variant="contained"
              color="primary"
              sx={{ p: "15px", marginTop: "30px" }}
              fullWidth
            >
              Đặt hàng
            </Button>
          </Grid>
        </StyledGridContainer>
      </form>

      {/* <h1>
        {cityAndDistrict}, {ward}
      </h1> */}
    </Box>
  );
}

export default CartDetail;
