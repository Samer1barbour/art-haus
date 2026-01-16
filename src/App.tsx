import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import NotFound from "./pages/NotFound";
import ScrollManager from "./components/ScrollManager";

const App = () => {
  return (
    <ScrollManager>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollManager>
  );
};

export default App;
