import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import projectionService from '../service/projectionService';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const ProjectionContainer = () => {
  const [prjs, setPrjs] = useState([]);
  useEffect(() => {
    loadProjection();
  }, []);

  const loadProjection = async () => {
    try {
        const allPrjs = await projectionService.getAllProjection();
        setPrjs(allPrjs);
      } catch (error) {
        console.error("Error fetching projections:", error);
      }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'heure', headerName: 'Time', width: 150 },
    { field: 'idFilm', headerName: 'id film', width: 150 },
    { field: 'idSalle', headerName: 'id salle', width: 150 },
  ];


  const handleEditClick = (row) => {
    
  };

 
  const addSalle = (e) => {
    e.preventDefault();
   
  }
  const handleDeleteClick = (row) => {
    const prj=prjs.find(prj=>prj.id===row.id)
    projectionService.deleteProjection(prj.id).then(()=>{
      loadProjection();
    })
  };



  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <div className="d-flex justify-content-end mb-3 data-grid">
      <button onClick={addSalle} className='add-mov'>add Salle</button>
      </div>
    <DataGridComponent
      columns={columns}
      rows={prjs}
      pageSizeOptions={[5]}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      showDisplayIcon={true}
    />
    </div>
    </div>
  );
};

export default ProjectionContainer;
