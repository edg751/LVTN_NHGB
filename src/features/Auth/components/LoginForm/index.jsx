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

LoginForm.propTypes = {};

function LoginForm(props) {
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
      email: "",
      password: "s",
    },
    resolver: yupResolver(schema),
  });

  //Vì phải đợi để có trạng thái isSubmitting nên ta thêm async
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    // console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };
  const { isSubmitting } = useFormState(form);

  return (
    <div>
      <StyledAvatar>
        <AccountCircleIcon></AccountCircleIcon>
      </StyledAvatar>

      <StyledTypography component="h3" variant="h5" sx={{ pt: "30px" }}>
        Sign in
      </StyledTypography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form}></InputField>
        <PasswordField
          name="password"
          label="Password"
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
          Sign in
        </StyledButton>
      </form>
    </div>
  );
}

export default LoginForm;
