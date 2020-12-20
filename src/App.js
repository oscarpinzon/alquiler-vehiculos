import React, { useState } from "react";
// CSS
import "./App.css";
// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
// Componentes
import Carro from "./components/Carro";
import Formulario from "./components/Formulario";

// Carros para probar la funcionalidad
const testCarros = [
  {
    id: 1,
    precioPorDia: 5,
    nombre: "Hyundai Accent",
    pasajeros: 4,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/hyundai_accent.png",
    fechasRentadas: [],
  },
  {
    id: 2,
    precioPorDia: 4,
    nombre: "Toyota Yaris",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/toyota_yaris.png",
    fechasRentadas: [],
  },
  {
    id: 3,
    precioPorDia: 6,
    nombre: "Kia Rio",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/kia_rio.png",
    fechasRentadas: [],
  },
  {
    id: 4,
    precioPorDia: 5,
    nombre: "Kia Picanto",
    pasajeros: 2,
    puertas: 2,
    transmision: "Automatica",
    imagen: "./img/kia_picanto.png",
    fechasRentadas: [],
  },
  {
    id: 5,
    precioPorDia: 4,
    nombre: "Nissan Almera",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/nissan_almera.png",
    fechasRentadas: [],
  },
  {
    id: 6,
    precioPorDia: 6,
    nombre: "Hyundai i10",
    pasajeros: 5,
    puertas: 4,
    transmision: "Automatica",
    imagen: "./img/hyundai_i10.png",
    fechasRentadas: [],
  },
];

const fechaHoy = new Date().toISOString().slice(0, 10);

const msPorDia = 1000 * 60 * 60 * 24;

const diasMinimoRenta = 1;

// Retorna la cantidad de días de diferencia en entre 2 días
function difEnDias(a, b) {
  // Descarta la informacion de zona horaria y de tiempo.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / msPorDia);
}

//Retorna un arreglo con todas las fechas que existen entre 2 fechas proporcionadas
function getFechasIntermedias(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  for (
    var arr = [], dt = new Date(startDate);
    dt <= endDate;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  let stringArray = arr.map((v) => v.toISOString().slice(0, 10));
  return stringArray;
}

const App = () => {
  const [showFormulario, setShowFormulario] = useState(false);
  const [showHistorial, setShowHistorial] = useState(false);
  const [selected, setSelected] = useState(testCarros[0]);
  const [carros, setCarros] = useState(testCarros);
  const [fechaInicioRenta, setFechaInicioRenta] = useState(fechaHoy);
  const [fechaFinRenta, setFechaFinRenta] = useState(fechaHoy);
  const [diasRenta, setDiasRenta] = useState(1);
  const [mostrarResultadoAlquiler, setMostrarResultadoAlquiler] = useState(
    false
  );
  const [alquilerValido, setAlquilerValido] = useState(false);
  const [historial, setHistorial] = useState([]);

  const handleFormularioClose = () => setShowFormulario(false);

  const handleAlquileresClose = () => setShowHistorial(false);

  const handleMostrarHistorial = () => {
    setShowHistorial(true);
  };

  // Método que se encarga de gestionar la lógica de cuando se hace click sobre el botón de alquilar
  const handleSelected = (id) => () => {
    const carroSeleccionado = carros.find((carro) => carro.id === id);
    setFechaInicioRenta(fechaHoy);
    setFechaFinRenta(fechaHoy);
    setDiasRenta(diasMinimoRenta);
    setSelected(carroSeleccionado);
    setMostrarResultadoAlquiler(false);
    setShowFormulario(true);
  };

  // Método que gestiona un intento de alquiler
  const handleIntentoAlquiler = () => {
    const fechasSonValidas =
      new Date(fechaInicioRenta) <= new Date(fechaFinRenta);

    if (fechasSonValidas) {
      const fechasAlquiladas = getFechasIntermedias(
        fechaInicioRenta,
        fechaFinRenta
      );

      let alquilerLibre = true;
      // Revisa que no este previamente alquilado para el rango de fechas del alquiler solicitado
      for (const fecha of fechasAlquiladas) {
        if (selected.fechasRentadas.includes(fecha)) {
          alquilerLibre = false;
          break;
        }
      }

      if (alquilerLibre) {
        const nuevoCarro = { ...selected, fechasRentadas: fechasAlquiladas };
        setCarros(
          carros.map((carro) =>
            carro.id === selected.id ? { ...carro, ...nuevoCarro } : carro
          )
        );
        const registroHistorial = {
          id: selected.id,
          nombre: selected.nombre,
          costo: selected.precioPorDia * diasRenta,
          fechaInicio: fechaInicioRenta,
          fechaFin: fechaFinRenta,
        };
        setHistorial(historial.concat(registroHistorial));
        setAlquilerValido(true);
        setMostrarResultadoAlquiler(true);
      } else {
        setAlquilerValido(false);
        setMostrarResultadoAlquiler(true);
      }
    } else {
      setAlquilerValido(false);
      setMostrarResultadoAlquiler(true);
    }
  };

  // Controla el input de fechas del formulario de alquiler para la fecha de inicio de alquiler
  const handleFechaInicioRenta = (event) => {
    const fechaInicio = new Date(event.target.value);
    const fechaFin = new Date(fechaFinRenta);
    if (fechaInicio > fechaFin) {
      alert("La fecha es invalida");
    } else {
      setDiasRenta(difEnDias(fechaInicio, fechaFin) + diasMinimoRenta);
      setFechaInicioRenta(event.target.value);
    }
  };

  // Controla el input de fechas del formulario de alquiler para la fecha final de alquiler
  const handleFechaFinRenta = (event) => {
    const fechaInicio = new Date(fechaInicioRenta);
    const fechaFin = new Date(event.target.value);
    if (fechaInicio > fechaFin) {
      alert("La fecha es invalida");
    } else {
      setDiasRenta(difEnDias(fechaInicio, fechaFin) + diasMinimoRenta);
      setFechaFinRenta(event.target.value);
    }
  };

  // Muestra el mensaje correcto, dependiendo del resultado del intento de alquiler
  let resultadoAlquiler;
  if (alquilerValido) {
    resultadoAlquiler = (
      <Alert className="alert-success" role="alert">
        <Alert.Heading>¡Su reserva fue exitosa!</Alert.Heading>
        <p>Su reserva del {selected.nombre} ha sido completada.</p>
        <p>
          Fechas de reserva: {fechaInicioRenta} al {fechaFinRenta}
        </p>
        <p>Costo total: ${selected.precioPorDia * diasRenta}</p>
      </Alert>
    );
  } else {
    resultadoAlquiler = (
      <Alert className="alert-danger" role="alert">
        <Alert.Heading>Hubo un problema en su reserva</Alert.Heading>
        <p>No pudimos completar su reserva del {selected.nombre}</p>
        <p>
          Para las fechas del {fechaInicioRenta} al {fechaFinRenta} este carro
          se encuentra alquilado.
        </p>
      </Alert>
    );
  }

  return (
    <>
      {/* Contiene el catalogo de carros*/}
      <Container>
        <h1 className="header">Alquiler de Vehículos</h1>
        <Row className="justify-content-center">
          <Button onClick={handleMostrarHistorial} className="text-center">
            Mostrar Historial
          </Button>
        </Row>

        <Row>
          {carros.map((carro) => (
            <Carro
              key={carro.id}
              carro={carro}
              handleSelected={handleSelected}
            />
          ))}
        </Row>
      </Container>

      {/* Modal responsable del formulario de alquiler*/}
      <Modal
        show={showFormulario}
        onHide={handleFormularioClose}
        className="rent-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Alquilar {selected.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mostrarResultadoAlquiler ? (
            resultadoAlquiler
          ) : (
            <Formulario
              selected={selected}
              fechaHoy={fechaHoy}
              fechaInicioRenta={fechaInicioRenta}
              handleFechaInicioRenta={handleFechaInicioRenta}
              fechaFinRenta={fechaFinRenta}
              handleFechaFinRenta={handleFechaFinRenta}
              diasRenta={diasRenta}
              handleIntentoAlquiler={handleIntentoAlquiler}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormularioClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal responsable del historial de alquileres*/}
      <Modal
        show={showHistorial}
        onHide={handleAlquileresClose}
        className="rent-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Historial de Alquiler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {historial.length > 0 ? (
            <Table className="table-bordered">
              <thead>
                <tr>
                  <th scope="col">Carro</th>
                  <th scope="col">Inicio del Alquiler</th>
                  <th scope="col">Fin del Alquiler</th>
                  <th scope="col">Costo Total</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((alquiler, indice) => {
                  return (
                    <tr key={indice}>
                      <th scope="row">{alquiler.nombre}</th>
                      <td>{alquiler.fechaInicio}</td>
                      <td>{alquiler.fechaFin}</td>
                      <td>${alquiler.costo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Alert className="alert-info">
              Intenta alquilar algún vehículo.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAlquileresClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
