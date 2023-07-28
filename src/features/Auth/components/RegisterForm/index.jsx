import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import styled from "@emotion/styled";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-control/InputField";
import PasswordField from "components/form-control/PasswordField";

RegisterForm.propTypes = {};

function RegisterForm(props) {
  const StyledAvatar = styled(Avatar)`
    margin: 0 auto;
  `;

  const StyledTypography = styled(Typography)`
    text-align: center;
    margin: 16px;
  `;
  const StyledButton = styled(Button)`
    margin: 50px auto 0px auto !important;
    display: block !important;
    background-color: #27006f;
    &:hover {
      background-color: #1a0049;
    }
  `;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email !")
      .max(30, "Email tối đa 30 kí tự")
      .email("Vui lòng nhập email hợp lệ !"),
    password: yup
      .string()
      .required("Vui lòng nhập password")
      .min(6, "Password phải dài hơn 6 kí tự")
      .max(20, "Password tối đa 20 kí tự"),
    fullname: yup
      .string()
      .required("Vui lòng nhập họ tên !")
      .test("", "Tên phải dài 2 chữ trở lên", (value) => {
        return value.split(" ").length >= 2;
      }),
    retypePassword: yup
      .string()
      .required("Vui lòng nhập lại password")
      .oneOf([yup.ref("password")], "Password không trùng nhau"),
  });
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      console.log("Values register: ", values);
      await onSubmit(values);
    }
  };
  const { isSubmitting } = useFormState(form);

  return (
    <div>
      <StyledAvatar>
        <AccountCircleIcon></AccountCircleIcon>
      </StyledAvatar>

      <StyledTypography component="h3" variant="h5" sx={{ pt: "30px" }}>
        Đăng ký tài khoản
      </StyledTypography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Họ và tên" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>

        <PasswordField
          name="password"
          label="Mật khẩu"
          form={form}
        ></PasswordField>

        <PasswordField
          name="retypePassword"
          label="Nhập lại mật khẩu"
          form={form}
        ></PasswordField>

        <StyledButton
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          color="primary"
          sx={{ p: "15px" }}
        >
          Đăng ký
        </StyledButton>
      </form>
    </div>
  );
}

export default RegisterForm;
