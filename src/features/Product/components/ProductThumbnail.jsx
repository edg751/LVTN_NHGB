import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

ProductThumbnail.propTypes = {};
const StyledImg = styled.img`
  border-radius: 5px;
  margin: 5px;
`;
function ProductThumbnail({ product }) {
  console.log("hinh:", product[0].images_list);
  return (
    <Box>
      {(() => {
        const images = [];
        const imageList = product[0].images_list;

        for (let i = 0; i < 6; i++) {
          const imageIndex = i % imageList.length;
          const image = imageList[imageIndex];

          images.push(
            <StyledImg key={i} src={image.pic_link} alt="" width="48%" />
          );
        }

        return images;
      })()}
    </Box>
  );
}

export default ProductThumbnail;
