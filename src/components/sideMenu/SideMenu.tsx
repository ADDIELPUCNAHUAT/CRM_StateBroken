import "../../../src/styles/index.css";
import "./SideMenu.css";

function SideMenu() {
  return (
    <>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              {/* Elementos antes de "Expanded menu" */}
              <li className="list-group-item py-1">
                <a href="/procesodeventa" className="text-reset">
                  <span>Procesos de venta</span>
                </a>
              </li>
              <li className="list-group-item py-1 dropend">
                <button
                  type="button"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Propiedades
                </button>
                <ul className="dropdown-menu list-group" id="prop-dropend">
                  <li className="list-group-item dropend-item">Ver todas</li>
                  <li className="list-group-item dropend-item">
                    Dar propiedad de alta
                  </li>
                  <li  className="list-group-item dropend-item"><a href="/mispropiedades" className="text-reset">Mis propiedades</a></li>
                </ul>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  <span>Llamadas</span>
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  <span>Calendario</span>
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  <span>Clientes</span>
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="/procesodeventa" className="text-reset">
                  <span>Herramientas</span>
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href= "/profilePage" className="text-reset">
                  <span>Perfil</span>
                </a>
              </li>
            </div>
          </div>
        </nav>

        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid" id="upper-bar">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand" href="/home">
              <img
                  id="logo-img"
                src="img\CasitaLogo.png"      
                alt="Estate Broker"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav ms-auto d-flex flex-row" id="icons-nav">
              <a href="#">
                <i
                  className="fa-solid fa-circle-half-stroke"
                  id="icon"
                  style={{ color: "#1D1B20" }}
                ></i>
              </a>
              <a href="#">
                <i
                  className="fa-solid fa-magnifying-glass"
                  id="icon"
                  style={{ color: "#1D1B20" }}
                ></i>
              </a>
              <a href="#">
                <i
                  className="fa-solid fa-gear"
                  id="icon"
                  style={{ color: "#1D1B20" }}
                ></i>
              </a>
              <a href="#">
                <i
                  className="fa-regular fa-bell"
                  id="icon"
                  style={{ color: "#1D1B20" }}
                ></i>
              </a>
              <a href="/profilePage">
                <div id="profile">
                  <img src="img\Avatar1.jpg" alt="profile" />
                </div>
              </a>
            </ul>
          </div>
        </nav>
      </header>
      <main style={{ marginTop: "58px" }}>
        <div className="container pt-4"></div>
      </main>
    </>
  );
}
export default SideMenu;
