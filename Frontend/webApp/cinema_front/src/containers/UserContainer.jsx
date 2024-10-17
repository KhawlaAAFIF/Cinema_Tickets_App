import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import userService from '../service/UserService';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const UserContainer = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
        const allUsers = await userService.getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'nom', headerName: 'Last name', width: 120},
    { field: 'prenom', headerName: 'First name', width: 120 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];







  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
      <div style={{ position: 'relative', top: '20px', left: '20%' }}>
        <h1><b>Users</b></h1>
      </div>
      <div className="d-flex justify-content-end mb-5 data-grid">
     
      </div>
    <DataGridComponent
      columns={columns}
      rows={users}
      pageSizeOptions={[5]}
      showActionColumn={false}
    />
    </div>
    </div>
  );
};

export default UserContainer;
