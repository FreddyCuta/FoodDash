import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantesTable from "./RestaurantesTable";
import MenuRestaurante from "./MenuRestaurante";
import RealizarPedido from "./RealizarPedido"; 
import VistaRestaurante from "./VistaRestaurante"; 
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider> 
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RestaurantesTable />} />
            <Route path="/restaurante/:id" element={<MenuRestaurante />} />
            <Route path="/realizar-pedido" element={<RealizarPedido />} />
            <Route path="/vista-restaurante/:id" element={<VistaRestaurante />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;