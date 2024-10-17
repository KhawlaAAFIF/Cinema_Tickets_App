import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ButtonAppBar from './navbar';
import filmService from '../service/filmService';
import projectionService from '../service/projectionService';

const useStyles = makeStyles((theme) => ({
  ticketContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh', 
    width: '100%', 
    padding: theme.spacing(4),
    
  },
  ticket: {
    maxWidth: '100%',
    height: '470px',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(150deg, #BD2031, white)', 
    color: theme.palette.common.white, 
  },
  ticketTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: theme.palette.common.white, 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)', 
  },
  ticketInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    color: theme.palette.common.white, 
  },
  ticketButton: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end', 
    background: 'linear-gradient(135deg, #BD2031, #8D021F)', 
  },
}));

const TicketDownload = () => {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get('movieId');
  const projectionId = searchParams.get('projectionId');
  const totalPrice = searchParams.get('totalPrice');
  const selectedSeats = searchParams.get('selectedSeats').split(',');

  const [movieData, setMovieData] = useState(null);
  const [projectionData, setProjectionData] = useState(null);
  const [userName, setUserName] = useState('Loading...'); 
 


  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUserName(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const movie = await filmService.getFilmById(movieId);
        setMovieData(movie);

        const projection = await projectionService.getProjectionById(projectionId);
        setProjectionData(projection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId, projectionId]);
  const seatCounts = {};
  selectedSeats.forEach(seat => {
    seatCounts[seat] = (seatCounts[seat] || 0) + 1;
  });
  

  const formattedSeats = Object.entries(seatCounts)
    .map(([seat, count]) => `${count} ${seat}`)
    .join(', ');

  const formatProjectionDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return ''; 
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = timeString.replace(':', ':').slice(0, -3); 
    return `${formattedDate}, at ${formattedTime}h`;
  };

  const movieName =  movieData ? movieData.titre : 'Loading...';;
  const projectionDateTime = projectionData ? formatProjectionDateTime(projectionData.date, projectionData.heure) : 'Loading...';
  
 
  const handleDownloadTicket = () => {
    const ticketInfo = `User Name: ${userName.nom} ${userName.prenom}\n` +
                       `Movie: ${movieName}\n` +
                       `Screen: ${projectionDateTime}\n` +
                       `Theater: ${projectionData.idSalle.id}\n` +
                       `Seats Selected: ${formattedSeats}\n` +
                       `Total Price: ${totalPrice} DH`;
                const blob = new Blob([ticketInfo], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ticket.txt';
                a.click();
              };
 
  return (
    <>
      <ButtonAppBar />
      <div className={classes.ticketContainer}>
        <Paper elevation={3} className={classes.ticket}>
          <Typography variant="h2" className={classes.ticketTitle}>
             MyCine E-Ticket
          </Typography>
          <Divider />
          <div className={classes.ticketInfo}>
            <Typography variant="subtitle1">
              <strong>User Name:</strong> {`${userName.nom} ${userName.prenom}`}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Movie :</strong> {movieName}
            </Typography>
            <Typography variant="subtitle1">
              <strong> Screen:</strong> {projectionDateTime}
            </Typography>
            <Typography variant="subtitle1">
              <strong> Theater:</strong>  {projectionData ? projectionData.idSalle.id : 'Loading...'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Seats Selected:</strong>   {formattedSeats}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total Price:</strong> {totalPrice} DH
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.ticketButton}
            onClick={handleDownloadTicket}
          >
            Download Ticket
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default TicketDownload;
