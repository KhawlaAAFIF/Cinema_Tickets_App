import React, { useState , useEffect } from 'react';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import Link from '../components/Link';
import '../styles/userauthetif.css';
import {login} from '../service/AuthService';
import { useNavigate  } from 'react-router-dom';


const LoginContainer = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const registeredUser = JSON.parse(sessionStorage.getItem('registeredUser'));
    if (registeredUser && registeredUser.email) {
      setUser({
        ...user,
        email: registeredUser.email,
      });
    }
  }, []);

  const handleRegisterLinkClick = (e) => {
    e.preventDefault();
    navigate('/register');
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(user);
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      navigate('/client/Movies');

    } catch (error) {
      
        setUser({
          ...user,
          password: '', 
          error: "Incorrect email or password. Please try again.",
        });
      
    }
  };
  return (
    <div className='user-auth' style={{ backgroundColor: 'rgba(104, 27, 27, 0.6)' , borderRadius: '20px'}}>
    
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <InputBox
        type="email"
        placeholder="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <InputBox
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      {user.error && <p className="error-message">{user.error}</p>}
      <div className="register-link">
        <p>
          Don't have an account?{' '}
          <Link onClick={handleRegisterLinkClick}>Register</Link>
        </p>
      </div>
   </Form>
   </div>
  );
};

export default LoginContainer;