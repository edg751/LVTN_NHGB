import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
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
import { Navigate, useNavigate } from "react-router-dom";

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
  const [selectedAddress, setSelectedAddress] = useState("otherAddress");
  const navigate = useNavigate();
  const [addressUser, setAddressUser] = useState([]);
  const [methodPayment, setMethodPayment] = useState("cod");
  const [numberPhone, setNumberPhone] = useState("");

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
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

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.user_id;

  useEffect(() => {
    (async () => {
      try {
        const list = await userApi.getAddress(user_id);
        setAddressUser(
          list.map((x) => ({
            contact_info_id: x.contact_info_id,
            city: x.city,
            district: x.district,
            ward: x.ward,
            address: x.address,
            phone_number: x.phone_number,
            user_id: x.user_id,
            name_info: x.name_info,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
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
    console.log(`Phuong thuc thanh toan:${methodPayment}`);

    // Xử lý dữ liệu người dùng sau khi bấm Đặt hàng
    if (selectedAddress === "otherAddress") {
      data.numberphone = numberPhone;
      data.address += `, ${ward}, ${cityAndDistrict}`;
    } else {
      let inputAddress = selectedAddress;
      const separatorIndex1 = inputAddress.lastIndexOf("-");
      const separatorIndex2 = inputAddress.lastIndexOf(":");
      const address = inputAddress.substring(0, separatorIndex1).trim();
      const phoneNumber = inputAddress
        .substring(separatorIndex1 + 1, separatorIndex2)
        .trim();
      const name = inputAddress.substring(separatorIndex2 + 1).trim();
      data.address = address;
      data.numberphone = phoneNumber;
      data.name = name;
    }

    try {
      data.totalprice = totalPrice;
      data.cartdata = cartData;
      data.userId = user_id;
      console.log("data User:", data);
      if (methodPayment === "cod") {
        const response = await axiosClient.post("/api/order", data);
        console.log("getOrderID", response.orderid.orderid);

        localStorage.removeItem("cart");
        navigate(`/feedback?order_id=${response.orderid.orderid}`);
      }

      if (methodPayment === "vnpay") {
        try {
          const response = await axiosClient.post("/api/order_vnpay", data);
          console.log("getOrderID", response.orderid.orderid);
          const responseVNPAY = await axiosClient.get("/create_payment_url", {
            params: {
              amount: totalPrice,
              bankCode: "",
              language: "",
              order_id: response.orderid.orderid,
            },
          });
          localStorage.removeItem("cart");
          window.location.href = responseVNPAY.vnpUrl;
        } catch (error) {
          console.log("Error:", error);
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error registering user:", error);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const trimmedValue = inputValue.trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi

    // Giới hạn tối đa 11 ký tự và tối thiểu 10 ký tự
    if (trimmedValue.length <= 11) {
      setNumberPhone(trimmedValue);
    }
  };

  return (
    <Box sx={{ marginTop: "50px", paddingBottom: "100px" }}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <StyledGridContainer container spacing={2}>
          <Grid item xs={6} md={4}>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", paddingBottom: "15px" }}
            >
              {" "}
              Thông tin giao hàng
            </Typography>

            <FormControl
              component="fieldset"
              sx={{
                marginLeft: "",
                border: "2px solid #dbdbdb",
                padding: "20px",
              }}
            >
              <RadioGroup
                aria-label="address"
                name="address"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                {addressUser.map((address, index) => (
                  <FormControlLabel
                    key={index}
                    value={`${address.address}, ${address.ward}, ${address.district}, ${address.city}-${address.phone_number}:${address.name_info}`}
                    control={<Radio />}
                    label={
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {`Tên người nhận : ${address.name_info} - Địa chỉ : ${address.address}, ${address.ward}, ${address.district}, ${address.city} - ${address.phone_number}`}
                      </Typography>
                    }
                  />
                ))}
                <FormControlLabel
                  value="otherAddress"
                  control={<Radio />}
                  label="Địa chỉ khác"
                />
              </RadioGroup>
            </FormControl>

            {selectedAddress === "otherAddress" && (
              <Box>
                <InputField
                  name="name"
                  label="Họ và tên"
                  form={form}
                ></InputField>

                <TextField
                  fullWidth
                  name="numberphone"
                  label="Số điện thoại"
                  type="number"
                  value={numberPhone}
                  onChange={handleInputChange}
                  required
                />
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
            )}
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
                name="radio-buttons-group"
                value={methodPayment}
                onChange={(event) => setMethodPayment(event.target.value)}
                form={form}
              >
                <FormControlLabel
                  value="cod"
                  name="method_payment"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng (COD)"
                />
                <FormControlLabel
                  name="method_payment"
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
