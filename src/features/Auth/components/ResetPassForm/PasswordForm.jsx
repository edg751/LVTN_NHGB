import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "api/axiosClient";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.pathname.split("/").pop();

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      console.log("Mật khẩu đã được gửi:", password);
      console.log("Token", token);

      const response = await axiosClient.post("/api/auth/resetpassword", {
        token: token,
        password: password,
      });

      navigate(`/`);
    } else {
      setIsMatch(false);
    }
  };

  return (
    <Box
      sx={{
        width: "600px",
        height: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TextField
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nhập lại mật khẩu"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
        error={!isMatch}
        helperText={!isMatch && "Mật khẩu không khớp"}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isMatch}
      >
        Cập nhật
      </Button>
    </Box>
  );
};

export default PasswordForm;
