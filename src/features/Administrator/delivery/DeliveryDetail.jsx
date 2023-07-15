import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import orderApi from "api/orderApi";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "api/axiosClient";

function SelectExample() {
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  const delivery_id = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await orderApi.getDeliveryStatus(delivery_id);
        setSelectedOption(list[0].delevery_status);
        console.log(list[0].delevery_status);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    let data = {};
    data.delivery_id = delivery_id;
    data.status = selectedOption;
    try {
      const response = await axiosClient.post(
        "/api/admin/delivery_update",
        data
      );
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      console.error(error); // Handle error if needed
    }
    navigate(`/admin/delivery`);
  };

  return (
    <FormControl sx={{ marginTop: "50px" }}>
      <InputLabel>Trạng thái</InputLabel>
      <Select value={selectedOption} onChange={handleChange}>
        <MenuItem value={0}>Đang xử lý</MenuItem>
        <MenuItem value={1}>Đang vận chuyển</MenuItem>
        <MenuItem value={2}>Đã giao</MenuItem>
        <MenuItem value={3}>Hoàn trả</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: "20px" }}
      >
        Cập nhật
      </Button>
    </FormControl>
  );
}

export default SelectExample;
