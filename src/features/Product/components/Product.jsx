import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
  const [linkImage, setLinkImage] = useState("");

  useEffect(() => {
    if (product.image && product.image.length > 0) {
      setLinkImage(product.image[0].pic_link);
    }
  }, [product]);

  const [selectedColor, setSelectedColor] = useState("");

  const handleChangeColor = (color) => {
    // setSelectedColor(color);
    console.log("Màu: ", color.color_id);
    console.log("image", product.image);
    for (const colors of product.image) {
      if (colors.color_id === color.color_id) {
        setLinkImage(colors.pic_link);
        console.log("Chon", colors.pic_link);
      }
    }
  };
  //
  const handleClick = () => {};
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1}>
        <Link to={`/products/0/${product.id}`}>
          <StyledImg src={linkImage} alt="" width={"100%"} />
        </Link>
      </Box>
      <EllipsisTypography variant="body2">
        <LinkNotDecoration to={`/products/0/${product.id}`}>
          {product.name}
        </LinkNotDecoration>
      </EllipsisTypography>

      <StyledTypographyPrice variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </Box>
      </StyledTypographyPrice>

      <ColorSelector
        selectedColor={selectedColor}
        handleChangeColor={handleChangeColor}
        color={product.color}
      />
    </Box>
  );
}

export default Product;
