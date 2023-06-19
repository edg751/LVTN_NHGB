import DetailPage from "features/Product/pages/DetailPage";
import ListPage from "features/Product/pages/ListPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./features/Cart/cart";
import Bottom from "components/Bottom";
import CartPage from "features/Cart/pages/cartPage";
import ImageUpload from "features/Administrator/testuploadimage";
import CartDetail from "features/Cart/pages/cartDetail";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/products" element={<ListPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/detail" element={<CartDetail />} />

        <Route path="/admin/uploadimage" element={<ImageUpload />} />
      </Routes>
      <Bottom />
    </div>
  );
}

export default App;
