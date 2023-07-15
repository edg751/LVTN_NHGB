import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./SideBar";
import { Box } from "@mui/material";

AddressProfile.propTypes = {};

function AddressProfile(props) {
  return (
    <Box
      sx={{
        height: "600px",
        width: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Sidebar />
      <div className="main-content">{/* Nội dung bên phải */}</div>
    </Box>
  );
}

export default AddressProfile;
