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
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {};
  const { isSubmitting } = useFormState(form);

  return (
    <div>
      <StyledAvatar backgroundColor="secondary.main">
        <AccountCircleIcon></AccountCircleIcon>
      </StyledAvatar>

      <StyledTypography component="h3" variant="h5" sx={{ pt: "30px" }}>
        Create An Account
      </StyledTypography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>

        <PasswordField
          name="password"
          label="Password"
          form={form}
        ></PasswordField>

        <PasswordField
          name="retypePassword"
          label="Retype Password"
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
          Create an account
        </StyledButton>
      </form>
    </div>
  );
}

export default RegisterForm;
