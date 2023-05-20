import DetailPage from "features/Product/pages/DetailPage";
import ListPage from "features/Product/pages/ListPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./features/Cart/cart";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/products" element={<ListPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
