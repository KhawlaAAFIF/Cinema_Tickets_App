import React, { useState } from 'react';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import '../styles/authentif.css';
import { adminLogin } from '../service/AuthService';

const AdminLogContainer = () => {
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(adminData);
      console.log("Response from adminLogin:", response); 
      if (response && response.email) {
        sessionStorage.setItem('adminEmail', response.email);
        console.log("Valid response");
        window.location.href = '/Admin';
      } else {
        console.log("Invalid response");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div className="container"> 
    <div className='admin-login' >
       <i className="bi bi-film fs-2 me-2 logo"></i> <h1>Welcome to administration</h1>
      <Form onSubmit={handleSubmit}>
        <InputBox
          type="email"
          placeholder="Email"
          name="email"
          value={adminData.email}
          onChange={handleChange}
        />
        <InputBox
          type="password"
          placeholder="Password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
        />
        <button type="submit"  style={{ backgroundColor: '#2e80d8'  , borderRadius: '20px'}}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </Form>
    </div>
    </div>
  );
};

export default AdminLogContainer;
