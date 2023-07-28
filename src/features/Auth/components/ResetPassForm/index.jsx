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
import axiosClient from "api/axiosClient";
import { enqueueSnackbar } from "notistack";

ResetPassForm.propTypes = {};

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

function ResetPassForm(props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập email !")
      .max(30, "Email tối đa 30 kí tự")
      .email("Vui lòng nhập email hợp lệ !"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    console.log("Values resetpass: ", values);

    const response = await axiosClient.post("/api/auth/reset", {
      email: values,
    });
    if (response === 1) {
      enqueueSnackbar("Đã gửi email reset mật khẩu", { variant: "success" });
    } else {
      enqueueSnackbar("Không tìm thấy email", { variant: "error" });
    }
  };
  const { isSubmitting } = useFormState(form);
  return (
    <div>
      <StyledAvatar>
        <AccountCircleIcon></AccountCircleIcon>
      </StyledAvatar>

      <StyledTypography component="h3" variant="h5" sx={{ pt: "30px" }}>
        Quên mật khẩu
      </StyledTypography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form}></InputField>

        <StyledButton
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          color="primary"
          sx={{ p: "15px" }}
        >
          Gửi email xác thực
        </StyledButton>
      </form>
    </div>
  );
}

export default ResetPassForm;
