import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import billetService from '../service/billetService';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const BilletContainer = () => {
  const [billets, setBillets] = useState([]);
  useEffect(() => {
    loadBillets();
  }, []);

  const loadBillets = async () => {
    try {
        const allBillets = await billetService.getAllBillets();
        setBillets(allBillets);
      } catch (error) {
        console.error("Error fetching projections:", error);
      }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'prix', headerName: 'Price', width: 150 },
    { field: 'numPlace', headerName: 'Place number', width: 150 },
    { field: 'idProjection', headerName: 'idProjection', width: 150 },
  ];


  const handleEditClick = (row) => {
    
  };

 
  const addSalle = (e) => {
    e.preventDefault();
   
  }
  const handleDeleteClick = (row) => {
    const billet=billets.find(billet=>billet.id===row.id)
    billetService.deleteBillet(billet.id).then(()=>{
      loadBillets();
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
      rows={billets}
      pageSizeOptions={[5]}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      showDisplayIcon={true}
    />
    </div>
    </div>
  );
};

export default BilletContainer;
