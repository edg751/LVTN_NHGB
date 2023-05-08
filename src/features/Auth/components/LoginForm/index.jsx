import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Typography } from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

LoginForm.propTypes = {};

function LoginForm(props) {
  const StyledAvatar = styled(Avatar)`
    margin: 0 auto;
  `;
  const StyledTypography = styled(Typography)`
    textAlign: "center",
    margin: useTheme().spacing(2, 0, 4, 0),
  `;
  const StyledButton = styled(Button)`
    margin: "50px auto 0px auto !Important",
    display: "block !Important",
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
        <LockClockOutlined></LockClockOutlined>
      </StyledAvatar>

      <StyledTypography component="h3" variant="h5" sx={{ pt: "30px" }}>
        Create An Account
      </StyledTypography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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

export default LoginForm;
