import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { enqueueSnackbar } from "notistack";

Infomation.propTypes = {};

function Infomation(props) {
  const [infomation, setInfomation] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;
      return userId;
    }
    return null;
  };

  const userId = getUserIdFromLocalStorage();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/user_infomation?user_id=${userId}`
        );
        setEmail(list[0].email);
        setName(list[0].full_name);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleUpdate = async () => {
    let data = {};
    data.name = name;
    data.user_id = userId;
    let response = await axiosClient.post(`/api/user_infomation`, data);
    console.log(response);
    if (response === 1) {
      enqueueSnackbar("Cập nhật thành công", { variant: "success" });
    } else {
      enqueueSnackbar("Cập nhật thất bại", { variant: "error" });
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center">
        Giao diện thông tin cá nhân
      </Typography>
      <TextField
        label="Họ và tên"
        value={name}
        fullWidth
        sx={{ margin: "10px 0px" }}
        onChange={handleNameChange}
      />
      <TextField
        label="Địa chỉ email"
        disabled
        fullWidth
        value={email}
        sx={{ margin: "10px 0px" }}
      />
      <Button onClick={handleUpdate}>Cập nhật</Button>
    </Box>
  );
}

export default Infomation;
