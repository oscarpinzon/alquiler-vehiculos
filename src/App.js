import React, { useState } from "react";
import "./App.css";
import Carro from "./components/Carro";

const carros = [
  {
    id: 1,
    precioPorDia: 5,
    nombre: "Hyundai Accent",
    pasajeros: 4,
    puertas: 4,
    transmision: "Automatica",
  },
  {
    id: 2,
    precioPorDia: 4,
    nombre: "Toyota Yaris",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
  },
  {
    id: 3,
    precioPorDia: 6,
    nombre: "Kia Rio",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
  },
];

const App = () => {
  return (
    <div>
      <h1>Carros</h1>
      {carros.map((carro) => (
        <Carro key={carro.id} carro={carro} />
      ))}
    </div>
  );
};

export default App;
