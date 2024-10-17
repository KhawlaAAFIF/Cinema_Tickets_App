import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import salleService from '../service/salleService';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const SalleContainer = () => {
  const [salles, setSalles] = useState([]);
  useEffect(() => {
    loadSalles();
  }, []);

  const loadSalles = async () => {
    try {
        const allSalles = await salleService.getAllSalles();
        setSalles(allSalles);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'capacite', headerName: 'Capacity', width: 150 },
  ];




  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
    <div style={{ position: 'relative', top: '20px', left: '20%' }}>
        <h1><b>Theaters</b></h1>
      </div>
    <div className="d-flex justify-content-end mb-5 data-grid">
     
      </div>
    <DataGridComponent
      columns={columns}
      rows={salles}
      pageSizeOptions={[5]}
      showActionColumn={false}
    />
    </div>
    </div>
  );
};

export default SalleContainer;
