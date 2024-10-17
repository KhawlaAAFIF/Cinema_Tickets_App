import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import '../styles/Sidebar.css'
export default Sidebar;

function Sidebar() {
  const navigate = useNavigate();


  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/adminlogin';
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-custom-color text-white p-4 vh-100">
      <div>
        <a href="d-flex align-items-center" className="text-white">
          <i className="bi bi-film fs-5 me-2"></i>
          <span className="fs-4">Cinema</span>
        </a>
        <hr className="text-secondary mt-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
          <button
              onClick={() => navigate("/admin")}
              className="nav-link text-white"
              style={{ border: "none", background: "none" }}
            >
              <i className="bi bi-speedometer me-2 fs-5"></i>
              <span className="fs-5">Dashboard</span>
              </button>
          </li>
          <li className="nav-item p-1">
          <button
              onClick={() => navigate("/admin/films")}
              className="nav-link text-white"
              style={{ border: "none", background: "none" }}
            >
              <i className="bi bi-film me-2 fs-5"></i>
              <span className="fs-5">Movies</span>
            </button>
          </li>
          <li className="nav-item p-1">
          <button
              onClick={() => navigate("/admin/users")}
              className="nav-link text-white"
              style={{ border: "none", background: "none" }}
            >
              <i className="bi bi-people me-2 fs-5"></i>
              <span className="fs-5">Users</span>
            </button>
          </li>
          <li className="nav-item p-1">
          <button
              onClick={() => navigate("/admin/reservations")}
              className="nav-link text-white"
              style={{ border: "none", background: "none" }}
            >
              <i className="bi bi-bag-check-fill me-2 fs-5"></i>
              <span className="fs-5">Reservations</span>
            </button>
          </li>
          <li className="nav-item p-1">
          <button
              onClick={() => navigate("/admin/salles")}
              className="nav-link text-white"
              style={{ border: "none", background: "none" }}
            >
              <i className="bi bi-camera-reels-fill me-2 fs-5"></i>
              <span className="fs-5">Theater</span>
            </button>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary " />
             <br></br>
             <button className="logout-button " onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}