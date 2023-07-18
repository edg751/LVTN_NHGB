import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import userApi from "api/userApi";
import { Link } from "react-router-dom";
import axiosClient from "api/axiosClient";
import { enqueueSnackbar } from "notistack";

const AddAddress = () => {
  const [showAddressField, setShowAddressField] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [listAddress, setListAddress] = useState([]);
  const [reRender, setRerender] = useState("");

  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;
      return userId;
    }
    return null;
  };

  const userId = getUserIdFromLocalStorage();

  useEffect(() => {
    (async () => {
      try {
        const list = await userApi.getAddress(userId);
        setListAddress(
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
  }, [reRender]);

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
  const handleAddAddress = () => {
    setShowAddressField(true);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
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
    setCity(selectedCityName);
    setDistrict(selectedDistrictName);
  };
  const handleWardClick = (e) => {
    setWard(e.target.outerText);
  };

  const handleSaveAddress = async () => {
    let data = {};
    data.city = city;
    data.district = district;
    data.ward = ward;
    data.address = address;
    data.name = name;
    data.phone = phone;
    data.userId = userId;
    let response = await axiosClient.post(`/api/add_address`, data);
    if (response === 1) {
      enqueueSnackbar("Thêm địa chỉ thành công", { variant: "success" });
      setCity("");
      setDistrict("");
      setWard("");
      setAddress("");
      setName("");
      setPhone("");
      setRerender(Date.now());
    } else {
      enqueueSnackbar("Thêm địa chỉ thất bại", { variant: "error" });
    }
    // Thực hiện các thao tác lưu địa chỉ vào cơ sở dữ liệu hoặc xử lý tùy ý
  };

  const handleDeleteAddress = async (contactId) => {
    console.log("Xóa đ/c có id là:", contactId);
    let data = {};
    data.address_id = contactId;
    let response = await axiosClient.post(`/api/delete_address`, data);
    if (response === 1) {
      enqueueSnackbar("Xóa địa chỉ thành công", { variant: "success" });
      setRerender(Date.now());
    } else {
      enqueueSnackbar("Xóa địa chỉ thất bại", { variant: "error" });
    }
  };
  return (
    <Box>
      <Typography variant="h5" align="center">
        Quản lý địa chỉ
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên người nhận</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Điện thoại</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAddress.map((address, index) => (
              <TableRow key={address.contact_info_id}>
                <TableCell>{address.name_info}</TableCell>
                <TableCell>{`${address.address}, ${address.ward}, ${address.district}, ${address.city}`}</TableCell>
                <TableCell>{address.phone_number}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteAddress(address.contact_info_id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleAddAddress}
        disabled={listAddress.length >= 3}
        sx={{ marginTop: "50px" }}
      >
        Thêm địa chỉ
      </Button>

      {showAddressField && (
        <Box>
          <FormControl sx={{ minWidth: "310px" }}>
            <InputLabel>Tỉnh thành</InputLabel>
            <Select value={selectedCity} onChange={handleCityChange}>
              {cities.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "310px" }}>
            <InputLabel>Quận huyện</InputLabel>
            <Select value={selectedDistrict} onChange={handleDistrictChange}>
              {districts.map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "310px" }}>
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
          </FormControl>

          <TextField
            label="Địa chỉ"
            required
            value={address}
            onChange={handleAddressChange}
            fullWidth
            sx={{ margin: "10px 0" }}
          />
          <TextField
            label="Tên người nhận"
            required
            value={name}
            onChange={handleNameChange}
            fullWidth
            sx={{ margin: "10px 0" }}
          />
          <TextField
            label="Số điện thoại"
            required
            type="number"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
            sx={{ margin: "10px 0" }}
          />
        </Box>
      )}

      {showAddressField && (
        <Button
          onClick={handleSaveAddress}
          disabled={
            ward === "" ||
            city === "" ||
            district === "" ||
            address === "" ||
            name === "" ||
            phone === ""
          }
        >
          Lưu địa chỉ
        </Button>
      )}
    </Box>
  );
};

export default AddAddress;
