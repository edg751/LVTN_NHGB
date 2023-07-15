import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { register } from "features/Auth/userSlice";

Register.propTypes = {};
function Register(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      console.log("asd: ", values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (closeDialog) {
        closeDialog();
      }
      //Thông báo thành công
      enqueueSnackbar("Vui lòng kiểm tra email để xác thực tài khoản !", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
