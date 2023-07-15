import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import * as yup from "yup";
import { useEffect, useState } from "react";
import productApi from "api/productApi";
import categoryApi from "api/categoriesApi";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-control/InputField";
import axiosClient from "api/axiosClient";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";

const schema = yup.object().shape({});
const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;
const UpdateProduct = () => {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();

  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Materials, setMaterials] = useState([]);
  const [Styles, setStyles] = useState([]);
  const [colorsData, setcolorsData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [gender, setGender] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const listCategories = await categoryApi.getAllCategoryAdmin();
        setCategories(
          listCategories.map((x) => ({
            id: x.category_id,
            name: x.category_name,
          }))
        );

        const listMaterials = await categoryApi.getAllMaterialAdmin();
        setMaterials(
          listMaterials.map((x) => ({
            id: x.material_id,
            name: x.material_name,
          }))
        );

        const listColors = await categoryApi.getAllColorAdmin();
        setcolorsData(
          listColors.map((x) => ({
            color_id: x.color_id,
            color_name: x.color_name,
          }))
        );

        const listSize = await categoryApi.getAllSize();
        setSizeData(
          listSize.map((x) => ({
            size_id: x.size_id,
            size_name: x.size_name,
          }))
        );

        const listStyles = await categoryApi.getAllStyleAdmin();
        setStyles(
          listStyles.map((x) => ({
            id: x.style_id,
            name: x.style_name,
          }))
        );

        const list = await productApi.getProductDetailUpdate(idProduct);
        setProductDetail(
          list.map((x) => ({
            product_name: x.product_name,
            price: x.price,
            product_description: x.product_description,
            gioi_tinh: x.gioi_tinh,
            category_id: x.category_id,
            material_id: x.material_id,
            style_id: x.style_id,
          }))
        );
        setProductPrice(list[0].price);
        setProductDescription(list[0].product_description);
        setProductName(list[0].product_name);
        setGender(list[0].gioi_tinh);
        setCategory(list[0].category_id);
        setMaterial(list[0].material_id);
        setStyle(list[0].style_id);
        setDisabled(list[0].is_active);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      productName: "",
      price: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  console.log(gender);

  //   const onSubmit = (data) => {
  //     // Gửi dữ liệu đến API hoặc xử lý theo nhu cầu
  //     console.log(data);
  //     // Reset form
  //     // reset();
  //   };

  const handleSubmit = async (data) => {
    try {
      data.productName = productName;
      data.gender_id = gender;
      data.category_id = category;
      data.material_id = material;
      data.style_id = style;
      data.price = productPrice;
      data.description = productDescription;
      data.idproduct = idProduct;
      if (disabled === true) {
        setDisabled(1);
      } else {
        setDisabled(0);
      }
      data.is_active = disabled;

      console.log("Data", data);
      const response = await axiosClient.post(
        "/api/admin/product_update",
        data
      );
      navigate("/admin/productList");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error registering user:", error);
    }
  };
  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setProductPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setDisabled(event.target.checked);
  };
  return (
    <RootContainer>
      <HeaderAdminPage />

      <CategoryAdminPage />
      <ContentContainer>
        {" "}
        {productDetail.length !== 0 && (
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              component="h1"
              align="center"
              mt={3}
              mb={4}
              sx={{ marginTop: "60px" }}
            >
              Chỉnh sửa sản phẩm ID : {idProduct}
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <TextField
                fullWidth
                required
                name="productName"
                label="Tên sản phẩm"
                defaultValue={productName}
                onChange={handleNameChange}
                sx={{ marginBottom: "20px" }}
              ></TextField>

              <TextField
                fullWidth
                required
                name="price"
                label="Giá tiền"
                defaultValue={productPrice}
                onChange={handlePriceChange}
                sx={{ marginBottom: "20px" }}
              ></TextField>
              <TextField
                fullWidth
                required
                name="description"
                label="Mô tả sản phẩm"
                defaultValue={productDescription}
                onChange={handleDescriptionChange}
              ></TextField>

              <FormControl fullWidth sx={{ marginTop: "15px" }}>
                <InputLabel>Giới tính</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value="0">Nam</MenuItem>
                  <MenuItem value="1">Nữ</MenuItem>
                  <MenuItem value="2">Unisex</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel>Loại sản phẩm</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {Categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel>Vật liệu</InputLabel>
                <Select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                >
                  {Materials.map((material) => (
                    <MenuItem key={material.id} value={material.id}>
                      {material.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel>Phong cách</InputLabel>
                <Select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  required
                >
                  {Styles.map((style) => (
                    <MenuItem key={style.id} value={style.id}>
                      {style.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={disabled}
                    onChange={handleCheckboxChange}
                    name="disabledCheckbox"
                    color="primary"
                  />
                }
                label="Đang hiển thị"
              />

              <Link to={`/admin/productDetail/${idProduct}`}>
                <Button sx={{ margin: "10px 0px" }}>
                  Cập nhật số lượng sản phẩm theo màu và size & cập nhật link
                  hình ảnh
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ p: "15px", marginTop: "30px" }}
                fullWidth
              >
                Cập nhật sản phẩm
              </Button>
            </form>
          </Container>
        )}
      </ContentContainer>
    </RootContainer>
  );
};

export default UpdateProduct;
