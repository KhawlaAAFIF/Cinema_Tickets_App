import React, { useEffect, useState } from 'react';
import filmService from '../service/filmService';
import userService from '../service/UserService';
import reservationService from '../service/reservationService';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [numFilms, setNumFilms] = useState(0);
  const [numReservations, setNumReservations] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    fetchData();
     const adminEmail = sessionStorage.getItem('adminEmail');
     if (adminEmail) {
       const name = adminEmail.split('@')[0];
       setAdminName(name);
     }
  }, []);

  const fetchData = async () => {
    try {
      const filmCount = await filmService.getCount();
      setNumFilms(filmCount);
      const usersCount= await userService.getCount();
      setNumUsers(usersCount);
      const reservationCount = await reservationService.getCount();
      setNumReservations(reservationCount);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/adminlogin';
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <Sidebar handleLogout={handleLogout} adminName={adminName}/>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: '130px', left: '20%' }}>
        <h1><b>Dashboard</b>  {adminName}</h1>
        
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: 'lightblue', padding: '20px', margin: '10px', borderRadius: '5px' }}>
          <h2>Number of Films: {numFilms}</h2>
      
        </div>
        <div style={{ backgroundColor: 'lightgreen', padding: '20px', margin: '10px', borderRadius: '5px' }}>
          <h2>Number of Reservations: {numReservations}</h2>
        </div>
        <div style={{ backgroundColor: 'lightcoral', padding: '20px', margin: '10px', borderRadius: '5px' }}>
          <h2>Number of Users: {numUsers}</h2>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default AdminDashboard;
