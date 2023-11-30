import { useEffect, useState } from "react";
import "../../../src/styles/index.css";
import SideMenu from "../../components/sideMenu/SideMenu";
import "./Property.css";
import { useParams } from 'react-router-dom';

interface PropertyData {
  id: number;
  idEmpleadoFk: number;
  idTipoFk: number;
  direccion: string;
  descripcion: string;
  precioVenta: number;
  precioRenta: number;
  metrosCuadrados: number;
  metrosConstruidos: number;
  fechaDeCreacion: string;
  fechaUltimaModificacion: string;
  idEditorFk: number;
  habitaciones: number;
  banos: number;
  piscina: boolean;
  balcon: boolean;
  cocina: boolean;
  comedor: boolean;
  garaje: boolean;
  numPlantas: number;
  anoConstruccion: string;
  sistemaCalefaccion: boolean;
  aireAcondicionado: boolean;
  amueblada: boolean;
  status: boolean;
  img1Path: string;
  img2Path: string;
  img3Path: string;
  img4Path: string;
  empleado: {
    id: number;
    nombre: string;
    correo_electronico: string;
    estatus: number;
  };
  tipoPropiedad: {
    id: number;
    nombre: string;
    descripcion: string;
  };
}



interface RouteParams {
  [key: string]: string;
}

function Property() {
  
  const { id } = useParams<RouteParams>();
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);

  useEffect(() => {
    fetch(`https://jimenezmiapi.somee.com/api/Inmueble?Id=${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setPropertyData(data[0])) // Aquí tomo el primer elemento del array
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!propertyData || !propertyData.empleado) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <SideMenu />
      <div className="property-container">
        <div className="row">
          <h1>Detalles del inmueble</h1>
          <div className="info-container">
            <h3>Subido por</h3>
            <div className="agente">
              <div className="profile-pic"></div>
              <div className="persona">
                <h5>{propertyData.empleado.nombre}</h5>
                <h6>{propertyData.fechaDeCreacion}</h6>
              </div>
            </div>
            <div className="details">
              <div className="row">
                <div className="col">Tipo inmueble</div>
                <div className="col">Dirección</div>
                <div className="col">Precio inmueble</div>
                <div className="col">Superficie</div>
                <div className="col">Construcción</div>
                <div className="col">Estado de venta</div>
              </div>
              <div className="row d-flex highlighted">
                <div className="col">{propertyData.tipoPropiedad.nombre}</div>
                <div className="col">{propertyData.direccion}</div>
                <div className="col">{propertyData.precioVenta}</div>
                <div className="col">{propertyData.metrosCuadrados}</div>
                <div className="col">{propertyData.anoConstruccion}</div>
                <div className="col">{propertyData.status|| "indefinido"}</div>
              </div>
            </div>
            <div className="description">
              <h1>Descripción</h1>
              <p>
                 Esta espaciosa casa, ubicada en una de las áreas más pintorescas
                de Cinco Colonias, es una oportunidad única. Con 5 habitaciones
                distribuidas en 5 plantas, ofrece un amplio espacio para toda la
                familia. La propiedad se encuentra amueblada y cuenta con un
                diseño contemporáneo que combina a la perfección con los
                detalles tradicionales. Los baños y la cocina están totalmente
                equipados, y un balcón privado agrega un toque de encanto al
                lugar. Además, la propiedad cuenta con un garaje para la
                comodidad de sus residentes. 
                {propertyData.descripcion}
              </p>
            </div>
            <div className="secondary">
              <h1>Datos secundarios</h1>
              <ul>
                <li className="secondary-item">CP: 28752</li>
                <li className="secondary-item">Habitaciones: {propertyData.habitaciones}</li>
                <li className="secondary-item">Número de Plantas: {propertyData.numPlantas}</li>
                <li className="secondary-item">Amueblado: {propertyData.amueblada || "Si"}</li>
                <li className="secondary-item">Baños: {propertyData.banos || "si"} </li>
                <li className="secondary-item">Piscina: {propertyData.piscina || "no"}</li>
                <li className="secondary-item">Balcón: {propertyData.balcon || "si"}</li>
                <li className="secondary-item">Cocina: {propertyData.cocina || "si"}</li>
                <li className="secondary-item">Garaje: {propertyData.garaje || "no"}</li>
              </ul>
            </div>
          </div>
          <div className="col image-layout">
            <div className="row full-width">
              <img src={propertyData.img1Path} alt="frente" />
            </div>
            <div className="row half-width-row">
              <div className="half-width">
                <img src={propertyData.img2Path} alt="sala" />
              </div>
              <div className="half-width">
                <img src={propertyData.img3Path} alt="recámara" />
              </div>
            </div>
            <div className="row full-width">
              <img src={propertyData.img4Path} alt="terraza" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Property;
function seEffect(arg0: () => void, arg1: number[]) {
  throw new Error("Function not implemented.");
}

