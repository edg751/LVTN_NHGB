import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const { closeDialog } = props;
  const handleSubmit = async (values) => {};

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
