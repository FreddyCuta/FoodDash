import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantesTable from "./RestaurantesTable";
import MenuRestaurante from "./MenuRestaurante"; 
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
