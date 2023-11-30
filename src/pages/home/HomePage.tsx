import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../../src/styles/index.css";
import "./HomePage.css";
import RenderProperties from "../../components/renderProperties/RenderProperties";
import SideMenu from "../../components/sideMenu/SideMenu";
// import ProfilePage from "../profile/ProfilePage";
import ListaClientesRecientes from "../../components/listaClientesRecientes/ListaClientesRecientes";
import EventosProximos from "../../components/eventosProximos/EventosProximos";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetch(
        `https://jimenezmiapi.somee.com/api/Login/ValidarToken?token=${token}`,
        {
          method: "HEAD",
        }
      )
        .then((response) => {
          if (!response.ok) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/");
        });
    }
  }, []);
  return (
    <>
      <SideMenu />
      
      <div id="home-page">
         <div className="row">
          <div className="col">
            <div className="left-col">
              <RenderProperties />
              <ListaClientesRecientes />
              <div id="graph-container">
                <img
                  className="img-component"
                  id="graph"
                  src="img\Grafica.png"
                  alt="Graph"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="align-col">
              <EventosProximos />
              <div id="calendar-container">
                <img
                  className="img-component"
                  id="calendar"
                  src="img\Calendario.png"
                  alt="Calendar"
                />
              </div>
            </div>
          </div>
        </div>        
      </div> 

     {/* 
     <ProfilePage/> */}
    </>
  );
}
export default HomePage;
