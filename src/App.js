import DetailPage from "features/Product/pages/DetailPage";
import ListPage from "features/Product/pages/ListPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/products" element={<ListPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
