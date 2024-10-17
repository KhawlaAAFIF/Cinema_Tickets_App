import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogContainer from './containers/AdminLogContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import AdFilmContainer from './containers/FilmContainer';
import SalleContainer from './containers/SalleContainer'
import AddFilmContainer from './containers/AddFilmContainer';
import ProjectionContainer from './containers/ProjectionContainer';
import BilletContainer from './containers/BilletContainer';
import ReservationContainer from './containers/ReservationContainer';
import UserContainer from './containers/UserContainer';
import AdminDashboard from './containers/AdminDashboard';
import Movies from './containers/Movies';
import BookingInterface from './containers/BookingInterface';
import Ticket from './components/ticket';
import Profile from './containers/profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/adminLogin" element={<AdminLogContainer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/films" element={<AdFilmContainer />} />
        <Route path="/admin/salles" element={<SalleContainer />} />
        <Route path="/admin/users" element={<UserContainer />} />
        <Route path="/admin/projections" element={<ProjectionContainer />} />
        <Route path="/admin/billets" element={<BilletContainer />} />
        <Route path="/admin/reservations" element={<ReservationContainer />} />
        <Route path="/admin/films/add" element={<AddFilmContainer />} />
        <Route path="/admin/films/edit/:id" element={<AddFilmContainer/>} />
        <Route path="/client/Movies" element={<Movies/>} />
        <Route path="/client/Book" element={<BookingInterface/>} />
        <Route path="/client/ticket" element={<Ticket/>} />
        <Route path="/profile" element={<Profile />} />

        </Routes>
    </Router>
   
  );
}

export default App;
