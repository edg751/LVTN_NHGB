import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { useNavigate } from "react-router-dom";

const LoginAdministrator = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // Xử lý logic đăng nhập tại đây
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const response = await axiosClient.post("/api/auth/admin_login", {
        email: username,
        password: password,
      });
      localStorage.setItem("admin", JSON.stringify(response.admin));
      navigate(`/admin`);

      console.log(response);
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "200px",
        }}
      >
        <Typography variant="h4">Đăng nhập trang quản lý</Typography>
        <TextField
          label="Tài khoản"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Box>
    </div>
  );
};

export default LoginAdministrator;
