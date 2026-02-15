import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantesTable from "./RestaurantesTable";
import MenuRestaurante from "./MenuRestaurante";
import RealizarPedido from "./RealizarPedido"; 
import VistaRestaurante from "./VistaRestaurante"; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Esta es tu pestaña principal con las tarjetas de restaurantes */}
          <Route path="/" element={<RestaurantesTable />} />

          {/* Esta es la nueva pestaña de platos. El ":id" es una variable dinámica */}
          <Route path="/restaurante/:id" element={<MenuRestaurante />} />

          {/* Esta es la pestaña para realizar el pedido */}
          <Route path="/realizar-pedido" element={<RealizarPedido />} />

          {/* Esta es la pestaña para la vista de restaurantes */}
          <Route path="/vista-restaurante/:id" element={<VistaRestaurante />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
