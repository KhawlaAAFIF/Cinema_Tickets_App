import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import reservationService from '../service/reservationService';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const ReservationContainer = () => {
  const [reservs, setReservs] = useState([]);
  useEffect(() => {
    loadReservation();
  }, []);

  const loadReservation = async () => {
    try {
        const allReservs = await reservationService.getAllReservations();
        setReservs(allReservs);
      } catch (error) {
        console.error("Error fetching projections:", error);
      }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'etat', headerName: 'State', width: 150 },
    { field: 'idUtilisateur', headerName: 'user', width: 150 },
    { field: 'idBillet', headerName: 'ticket', width: 150 },
  ];

 
 
  const handleDeleteClick = (row) => {
    const reserv=reservs.find(reserv=>reserv.id===row.id)
    reservationService.deleteReservation(reserv.id).then(()=>{
      loadReservation();
    })
  };



  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
    <div style={{ position: 'relative', top: '20px', left: '20%' }}>
        <h1><b>Reservations</b></h1>
      </div>
    <div className="d-flex justify-content-end mb-5 data-grid">
     
     </div>
    <DataGridComponent
      columns={columns}
      rows={reservs}
      pageSizeOptions={[5]}
      showActionColumn={true}
      onDeleteClick={handleDeleteClick}
      showDisplayIcon={true}
    />
    </div>
    </div>
  );
};

export default ReservationContainer;
