import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import adminApi from "api/adminApi";
import productApi from "api/productApi";
import axiosClient from "api/axiosClient";

const DetailProductForm = () => {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();
  // Dữ liệu giả cho bảng
  const [productDetail, setProductDetail] = useState([]);
  const [imageDetail, setImageDetail] = useState([]);

  // DATA
  // const pictures = [
  //   {
  //     color_id: 1,
  //     color_name: "Đỏ",
  //     pic_id: 1,
  //     pic_link: "https://example.com/red.jpg",
  //   },
  //   {
  //     color_id: 1,
  //     color_name: "Đỏ",
  //     pic_id: 2,
  //     pic_link: "https://example.com/red2.jpg",
  //   },
  //   {
  //     color_id: 2,
  //     color_name: "Xanh",
  //     pic_id: 3,
  //     pic_link: "https://example.com/blue.jpg",
  //   },
  //   {
  //     color_id: 2,
  //     color_name: "Xanh",
  //     pic_id: 4,
  //     pic_link: "https://example.com/blue2.jpg",
  //   },
  // ];

  useEffect(() => {
    (async () => {
      try {
        const list1 = await productApi.getProductDetailAdmin(idProduct);
        setProductDetail(
          list1.map((x) => ({
            color_name: x.color_name,
            size_name: x.size_name,
            quantity: x.qualtity,
            size_id: x.size_id,
            color_id: x.color_id,
          }))
        );
        const list2 = await productApi.getProductLinkAdmin(idProduct);
        setImageDetail(
          list2.map((x) => ({
            pic_id: x.pic_id,
            color_name: x.color_name,
            color_id: x.color_id,
            pic_link: x.pic_link,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    // Xử lý dữ liệu sau khi ấn submit
    let data = {};
    data.productListDetail = productDetail;
    data.productid = idProduct;
    data.imageDetail = imageDetail;
    console.log("data sau khi change số lượng", data);
    try {
      const response = await axiosClient.post(
        "/api/admin/update_quantity_product",
        data
      );
    } catch (error) {
      console.log("Error to fetch category API", error);
    }
  };

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    setProductDetail((prevProductDetail) =>
      prevProductDetail.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: value };
        }
        return item;
      })
    );
  };
  // COLOR
  const mapColors = {};
  imageDetail.forEach((picture) => {
    if (!mapColors[picture.color_name]) {
      mapColors[picture.color_name] = [];
    }
    mapColors[picture.color_name].push(picture);
  });

  // const [updatedPictures, setUpdatedPictures] = useState(pictures);
  const handleLinkChange = (colorId, picId, index, event) => {
    const { value } = event.target;
    setImageDetail((prevPictures) => {
      const updated = prevPictures.map((picture) => {
        if (picture.color_id === colorId && picture.pic_id === picId) {
          return { ...picture, pic_link: value };
        }
        return picture;
      });
      return updated;
    });
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Color Name</TableCell>
              <TableCell>Size Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productDetail.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.color_name}</TableCell>
                <TableCell>{item.size_name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Màu</TableCell>
              <TableCell>Link ảnh</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(mapColors).map((colorName) => (
              <TableRow key={colorName}>
                <TableCell>{colorName}</TableCell>
                <TableCell>
                  {mapColors[colorName].map((picture, index) => (
                    <TextField
                      type="text"
                      defaultValue={picture.pic_link}
                      onChange={(event) =>
                        handleLinkChange(
                          picture.color_id,
                          picture.pic_id,
                          index,
                          event
                        )
                      }
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default DetailProductForm;
