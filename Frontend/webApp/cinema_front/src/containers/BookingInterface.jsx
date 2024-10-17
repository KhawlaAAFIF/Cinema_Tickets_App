import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../components/navbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import filmService from '../service/filmService';
import projectionService from '../service/projectionService';
import billetService from '../service/billetService'; 
import reservationService from '../service/reservationService';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(14),
  },
  bookingDetails: {
    flex: '0 0 45%',
    marginRight: theme.spacing(3),
    background: 'linear-gradient(160deg, #BD2031, #FFFFFF)', // Linear gradient with white
    padding: theme.spacing(5),
    borderRadius: theme.spacing(3),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  paymentInfo: {
    flex: '0 0 45%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    background: 'linear-gradient(160deg, #BD2031, #FFFFFF)', // Linear gradient with white
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: '#333',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  formLabel: {
    color: 'white',
    fontSize: '1rem',
  },
  inputField: {
    width: '100%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(0.5),
    backgroundColor: '#f9f9f9',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center', // Center the buttons horizontally
    gap: theme.spacing(2),
  },
  totalPrice: {
    marginTop: theme.spacing(2),
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    color: '#333',
    border: '1px solid transparent',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#BD2031', // Change to the color you want on hover
      color: '#fff',
      border: '1px solid #BD2031',
    },
  },
}));

const BookingInterface = ({ onClose }) => {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get('movieId');
  const projectionId = searchParams.get('projectionId');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedProjection, setSelectedProjection] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
  });
 const [user, setUser] = useState(null);
 const [redirectToTicket, setRedirectToTicket] = useState(false);
  useEffect(() => {
    const fetchMovieAndProjectionData = async () => {
      try {
        const movie = await filmService.getFilmById(movieId);
        setSelectedMovie(movie);
        const projection = await projectionService.getProjectionById(projectionId);
        setSelectedProjection(projection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieAndProjectionData();
  }, [movieId, projectionId]);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);


  const [openDialog, setOpenDialog] = useState(false);

  
  const seatPrices = {
    Balcony: 50,
    Normal: 40,
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats([...selectedSeats, seat]);
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({...paymentInfo, [name]: value });
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seatPrices[seat], 0);
  };

  const getSelectedSeatCount = (seat) => {
    return selectedSeats.filter((selectedSeat) => selectedSeat === seat).length;
  };

  const handleConfirmBooking = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const formatProjectionDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return ''; 

    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = timeString.replace(':', ':').slice(0, -3); 
    return `${formattedDate}, at ${formattedTime}h`;
  };


  const handleConfirmBookingFinal = async () => {
    const totalPrice = getTotalPrice();
    const numSeatsReserved = selectedSeats.length;
    const idProjectionSelected = selectedProjection.id; 
   
    const billet = {
      prix: totalPrice,
      numPlace: numSeatsReserved,
      idProjection: { id: idProjectionSelected },
    };
    const reservation = {
      idBillet: billet,
      idUser: user.id, 
    };

    try {
      const responseTicket = await billetService.addBillet(billet);
      console.log('Ticket added successfully!', responseTicket);

      const responseReservation = await reservationService.addReservation(reservation);
      console.log('Reservation added successfully!', responseReservation);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du billet :', error);
    }

    setRedirectToTicket(true); 
    setOpenDialog(false);
  };
  if (redirectToTicket) {
    return <Navigate to={`/client/ticket?movieId=${selectedMovie?.id}&projectionId=${selectedProjection?.id}&totalPrice=${getTotalPrice()}&selectedSeats=${selectedSeats.join(',')}`} replace />;
  }


  const handleCancelBooking = () => {
    console.log('Booking cancelled.');
    setOpenDialog(false);
  };

  return (
    <>
      <ButtonAppBar />
      <div className={classes.container}>
        <div className={classes.bookingDetails}>
          <Typography variant="h4" className={classes.sectionTitle}>
            <h3>Booking Details</h3>
          </Typography>
          <br />
          <Typography variant="body1" className={classes.sectionTitle}>
        Movie: {selectedMovie ? selectedMovie.titre : 'Loading...'}
      </Typography>
      <Typography variant="body1" className={classes.sectionTitle}>
            Screen: {selectedProjection ? formatProjectionDateTime(selectedProjection.date, selectedProjection.heure) : 'Loading...'}
          </Typography>

          <hr />
          {Object.entries(seatPrices).map(([seat, price]) => (
        <div key={seat} className={classes.sectionTitle}>
          <Typography variant="body1">
            Price of the {seat} Seat: {price} DH
          </Typography>
          <Typography variant="body1">
            Number of {seat} seats selected: {getSelectedSeatCount(seat)}
          </Typography>
        </div>
      ))}
          <div className={classes.buttonGroup}>
            {Object.keys(seatPrices).map((seat) => (
              <Button
                key={seat}
                variant="contained"
                color="primary"
                className={classes.transparentButton}
                onClick={() => handleSeatSelect(seat)}
              >
                Select a {seat} Seat 
              </Button>
            ))}
          </div>
        </div>
        <div className={classes.paymentInfo}>
          <Typography variant="h4" className={classes.sectionTitle}>
            <h3 style={{ color: 'white' }}>Payment Information</h3>
          </Typography>
          <label htmlFor="cardNumber" className={classes.formLabel}>
            Card Number:
          </label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            placeholder="1234 5678 9012 3456"
            className={classes.inputField}
            onChange={handlePaymentInfoChange}
          />
          <label htmlFor="expiryDate" className={classes.formLabel}>
            Expiry Date:
          </label>
          <input
            id="expiryDate"
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            placeholder="MM/YY"
            className={classes.inputField}
            onChange={handlePaymentInfoChange}
          />
        
          <Typography variant="body1" className={classes.totalPrice}>
            Total Price: ${getTotalPrice()}
          </Typography>
          <div className={classes.buttonGroup}>
            <Button variant="contained" color="secondary" className={classes.transparentButton} onClick={handleCancelBooking}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" className={classes.transparentButton} onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelBooking} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBookingFinal} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingInterface;