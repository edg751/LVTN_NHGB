import DetailPage from "features/Product/pages/DetailPage";
import ListPage from "features/Product/pages/ListPage";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./features/Cart/cart";
import Bottom from "components/Bottom";
import CartPage from "features/Cart/pages/cartPage";

import CartDetail from "features/Cart/pages/cartDetail";
import AdminDashboard from "features/Administrator/AdminDashboard";
import { useState } from "react";
import OrderDetail from "features/Administrator/order/OrderDetail";
import OderList from "features/Administrator/order/OderList";
import AddProductForm from "features/Administrator/product/addProduct";
import DetailProductForm from "features/Administrator/product/detailProduct";
import ProductList from "features/Administrator/product/productList";
import CategoryList from "features/Administrator/category/CategoryList";
import AddCategory from "features/Administrator/category/AddCategory";
import DetailCategory from "features/Administrator/category/DetailCategory";
import AddMaterial from "features/Administrator/material/AddMaterial";
import MaterialList from "features/Administrator/material/MaterialList";
import DetailMaterial from "features/Administrator/material/DetailMaterial";
import StyleList from "features/Administrator/style/StyleList";
import AddStyle from "features/Administrator/style/AddStyle";
import DetailStyle from "features/Administrator/style/DetailStyle";
import ColorList from "features/Administrator/color/ColorList";
import AddColor from "features/Administrator/color/AddColor";
import DetailColor from "features/Administrator/color/DetailColor";

function App() {
  const location = useLocation();
  const [isInAdmin, setIsInAdmin] = useState(
    location.pathname.startsWith("/admin")
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/ProductList" element={<ProductList />} />
        <Route path="/admin/addProduct" element={<AddProductForm />} />
        <Route
          path="/admin/productDetail/:productid"
          element={<DetailProductForm />}
        />

        <Route path="/admin/oderdetail/:orderid" element={<OrderDetail />} />
        <Route path="/admin/order" element={<OderList />} />

        <Route path="/admin/categoryList" element={<CategoryList />} />
        <Route path="/admin/addCategory" element={<AddCategory />} />
        <Route
          path="/admin/detailCategory/:categoryid"
          element={<DetailCategory />}
        />

        <Route path="/admin/materialList" element={<MaterialList />} />
        <Route path="/admin/addMaterial" element={<AddMaterial />} />
        <Route
          path="/admin/detailMaterial/:materialid"
          element={<DetailMaterial />}
        />

        <Route path="/admin/styleList" element={<StyleList />} />
        <Route path="/admin/addStyle" element={<AddStyle />} />
        <Route path="/admin/detailStyle/:styleid" element={<DetailStyle />} />

        <Route path="/admin/colorList" element={<ColorList />} />
        <Route path="/admin/addColor" element={<AddColor />} />
        <Route path="/admin/detailColor/:colorid" element={<DetailColor />} />
      </Routes>

      {!isInAdmin && <Header />}

      <Routes>
        <Route path="/products/:gender" element={<ListPage />} />
        <Route path="/products/:gender/:productId" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/detail" element={<CartDetail />} />
      </Routes>

      {!isInAdmin && <Bottom />}
    </div>
  );
}

export default App;
