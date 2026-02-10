import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RestaurantesTable from "./RestaurantesTable";

function App() {
  return (
    <div className="App">
       <RestaurantesTable />
    </div>
  )
}

export default App
