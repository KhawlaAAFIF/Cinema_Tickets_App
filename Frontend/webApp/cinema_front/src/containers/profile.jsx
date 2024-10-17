import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import '../styles/profileStyle.css';
import userService from '../service/UserService'; 
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setFormData(JSON.parse(loggedInUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.updateUser(formData); 
      if (response.status === 200) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(formData));
        alert('User information updated successfully!');
      } else {
        alert('Failed to update user information. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('An error occurred while updating user information. Please try again later.');
    }
  };

  return (
    <div className='user-profile' style={{ backgroundColor: '#8D021F', padding: '30px' }}>
  <Form onSubmit={handleSubmit}>
    <h1>Edit Profile</h1>
    {formData && (
      <>
        <div className="label-input container">
          <label htmlFor="nom">Name:</label>
          <InputBox
            type="text"
            id="nom"
            placeholder="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input container">
          <label htmlFor="prenom">First Name:</label>
          <InputBox
            type="text"
            id="prenom"
            placeholder="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input container">
          <label htmlFor="email">Email:</label>
          <InputBox
            type="email"
            id="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input container">
          <label htmlFor="password">Password:</label>
          <InputBox
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </>
    )}
    
    <button type="submit">Update</button>
    <button  type="button" onClick={() => navigate(-1)}>go back</button>
  </Form>
</div>

  );
};

export default Profile;