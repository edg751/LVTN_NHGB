import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import ColorSelector from "./Filter/Color";

Product.propTypes = {
  product: PropTypes.object,
};

const LinkNotDecoration = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: #c08102;
  }
`;
const EllipsisTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin-left: 7px;
`;
const StyledImg = styled.img`
  border-radius: 5px;
  transition: transform 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.07);
  }
`;
const StyledTypographyPrice = styled(Typography)`
  text-align: left;
  margin-left: 7px;
  color: #cd151c;
`;

function Product(props) {
  const { product } = props;

  //
  const [selectedColor, setSelectedColor] = useState("");

  const handleChangeColor = (color) => {
    setSelectedColor(color);
    console.log("Màu: ", color);
  };
  //
  const handleClick = () => {};
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1}>
        <Link to="/">
          <StyledImg
            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-polo-nam-apm4239-dlv-2.jpg?v=1679886098000"
            alt=""
            width={"100%"}
          />
        </Link>
      </Box>
      <EllipsisTypography variant="body2">
        <LinkNotDecoration to="/">
          {"Áo Polo Nam Airycool Áo Polo Nam Airycool Áo Polo Nam Airycool "}
        </LinkNotDecoration>
      </EllipsisTypography>
      <StyledTypographyPrice variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(200000)}
        </Box>
      </StyledTypographyPrice>
      <ColorSelector
        selectedColor={selectedColor}
        handleChangeColor={handleChangeColor}
      />
    </Box>
  );
}

export default Product;
