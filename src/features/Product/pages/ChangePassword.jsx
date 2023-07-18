import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { enqueueSnackbar } from "notistack";

ChangePassword.propTypes = {};

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [reTypepassword, setReTypePassword] = useState("");

  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;
      return userId;
    }
    return null;
  };

  const userId = getUserIdFromLocalStorage();
  const handleOldPassChange = (event) => {
    setOldPassword(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handleReTypePassChange = (event) => {
    setReTypePassword(event.target.value);
  };

  const handleUpdate = async () => {
    let data = {};
    data.old_pass = oldPassword;
    data.new_pass = password;
    data.user_id = userId;
    let response = await axiosClient.post(`/api/user_password`, data);
    if (response === 1) {
      enqueueSnackbar("Thay đổi mật khẩu thành công !", { variant: "success" });
      setOldPassword("");
      setPassword("");
      setReTypePassword("");
    } else {
      enqueueSnackbar("Thay đổi mật khẩu thất bại !", { variant: "error" });
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center">
        Đổi mật khẩu
      </Typography>
      <TextField
        label="Mật khẩu cũ"
        type="password"
        onChange={handleOldPassChange}
        value={oldPassword}
        fullWidth
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Mật khẩu mới"
        onChange={handlePassChange}
        value={password}
        type="password"
        fullWidth
        sx={{ margin: "10px 0px" }}
      />
      <TextField
        label="Xác nhận mật khẩu"
        value={reTypepassword}
        onChange={handleReTypePassChange}
        type="password"
        fullWidth
        sx={{ margin: "10px 0px" }}
      />
      {(oldPassword === "" || password === "" || oldPassword === "") && (
        <Button disabled onClick={handleUpdate}>
          Cập nhật
        </Button>
      )}
      {oldPassword !== "" &&
        password !== "" &&
        oldPassword !== "" &&
        password === reTypepassword && (
          <Button onClick={handleUpdate}>Cập nhật</Button>
        )}

      {oldPassword !== "" &&
        password !== "" &&
        oldPassword !== "" &&
        password !== reTypepassword && (
          <Button disabled onClick={handleUpdate}>
            Cập nhật
          </Button>
        )}
    </Box>
  );
}

export default ChangePassword;
