import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;
  // console.log(control);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, defaultValue },
        fieldState: { invalid, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          disabled={disable}
          required
          defaultValue={defaultValue}
        />
      )}
    ></Controller>
  );
}

export default InputField;
