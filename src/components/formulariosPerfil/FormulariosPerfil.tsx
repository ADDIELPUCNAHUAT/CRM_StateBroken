import React, { useState } from 'react';
import '../../../src/styles/index.css';
import './FormulariosPerfil.css';
import ListaMisClientes from './subComponents/listaMisClientes/ListaMisClientes';
import MisPropiedades from './subComponents/misPropiedades/MisPropiedades';
import MisProcesosVenta from './subComponents/misProcesosVenta/MisProcesosVenta';
import FormClientes from './subComponents/formClientes/FormClientes';
import FormPropiedades from './subComponents/formPropiedades/FormPropiedades';
import FormProcesoVenta from './subComponents/formProcesoVenta/FormProcesoVenta';

function FormulariosPerfil() {
  const [mostrarFormulario, setMostrarFormulario] = useState<string | null>(null);

  const mostrarFormularioHandler = (formulario: string | null) => {
    setMostrarFormulario(formulario === mostrarFormulario ? null : formulario);
  };

  const cerrarFormularioHandler = () => {
    setMostrarFormulario(null);
  };

  return (
    <div className="miTab">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#contenido1">
            Clientes
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#contenido2">
            Propiedades
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#contenido3">
            Procesos de venta
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane container active" id="contenido1">
          {mostrarFormulario === 'clientes' ? (
            <>
              <FormClientes onClose={cerrarFormularioHandler} />
              <footer>
                <button className="miBoton2" onClick={cerrarFormularioHandler}>
                  Cerrar
                </button>
              </footer>
            </>
          ) : (
            <>
              <ListaMisClientes />
              <footer>
                <button
                  className="miBoton"
                  onClick={() => mostrarFormularioHandler('clientes')}
                >
                  +
                </button>
              </footer>
            </>
          )}
        </div>
        <div className="tab-pane fade misCartas" id="contenido2">
          {mostrarFormulario === 'propiedades' ? (
            <>
              <FormPropiedades onClose={cerrarFormularioHandler} />
              <footer>
                <button className="miBoton2" onClick={cerrarFormularioHandler}>
                  Cerrar
                </button>
              </footer>
            </>
          ) : (
            <>
              <MisPropiedades />
              <footer>
                <button
                  className="miBoton"
                  onClick={() => mostrarFormularioHandler('propiedades')}
                >
                  +
                </button>
              </footer>
            </>
          )}
        </div>
        <div className="tab-pane container fade" id="contenido3">
          {mostrarFormulario === 'procesosVenta' ? (
            <>
            <FormProcesoVenta />
            <footer>
              <button className="miBoton2" onClick={cerrarFormularioHandler}>
                Cerrar
              </button>
            </footer>
          </>

          ) : (
            <>
              <MisProcesosVenta />
              <footer>
                <button
                  className="miBoton"
                  onClick={() => mostrarFormularioHandler('procesosVenta')}
                >
                  +
                </button>
              </footer>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormulariosPerfil;