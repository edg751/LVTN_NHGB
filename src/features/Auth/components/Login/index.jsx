import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";
import { login } from "features/Auth/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // console.log("Form submit: ", values);
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log("Login success ", user);
      //Làm gì tiếp theo nếu đăng ký thành công !
      //Close dialog
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        "Sai tài khoản hoặc mật khẩu, hoặc tài khoản chưa được kích hoạt !",
        { variant: "error" }
      );
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
