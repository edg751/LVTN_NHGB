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
      password: "",
    },
    resolver: yupResolver(schema),
  });

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
    console.log(result);
    setCityAndDistrict(result);
  };
  const handleWardClick = (e) => {
    console.log(e.target.outerText);
    setWard(e.target.outerText);
  };

  //Vì phải đợi để có trạng thái isSubmitting nên ta thêm async
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    // console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };
  const { isSubmitting } = useFormState(form);
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
              disabled={isSubmitting}
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
