import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import projectionService from '../service/projectionService';


const useStyles = makeStyles((theme) => ({
  modalContent: {
    padding: theme.spacing(2),
    lineHeight: '1.5',
  },
  poster: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: '#333',
    marginBottom: theme.spacing(2),
  },
  bodyText: {
    color: '#555',
    marginBottom: theme.spacing(1),
  },
  category: {
    color: '#BD2031', 
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  projectionItem: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: ' #BD2031',
    },
  },
  selectedProjection: {
    backgroundColor: '#8D021F',
    color: '#fff',
    fontWeight: 'bold',
  },
}));

const MovieModal = ({ open, onClose, movie }) => {
  const classes = useStyles();
  const [projections, setProjections] = useState([]);
  const [selectedProjection, setSelectedProjection] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showProjectionsModal, setShowProjectionsModal] = useState(false);


  const handleBookClick = async () => {
    try {
      const data = await projectionService.getProjectionsByFilmId(movie.id);
      setProjections(data);
      setShowProjectionsModal(true);
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Error fetching projections:', error);
    }
  };

  const handleCloseProjectionsModal = () => {
    setShowProjectionsModal(false);
    setSelectedProjection(null);
  };

  const handleProjectionSelect = (projection) => {
    setSelectedProjection(projection);
  };

  const formatProjectionDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return ''; 

    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = timeString.replace(':', ':').slice(0, -3); 
    return `${formattedDate}, at ${formattedTime}h`;
  };


  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.title}>DETAILS</DialogTitle>
      <DialogContent className={classes.modalContent}>
        <img src={movie.poster} className={classes.poster} alt={movie.titre} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        <Typography variant="h5" className={classes.title}><h1>{movie.titre}</h1></Typography>
        <Typography variant="body1" className={classes.bodyText}>
          <h5 style={{ color: '#BD2031', fontWeight: 'bold'  }}>Release Date: {movie.dateSortie}</h5>
        </Typography>
        <Typography variant="body1" className={classes.category}>Genre: {movie.idCategorie.genre}</Typography>

        <Typography variant="body1" className={classes.bodyText}>
          <h4 style={{ color: '#8D021F', fontWeight: 'bold' }}>About Movie:</h4>
        </Typography>
        <Typography variant="body2" className={classes.bodyText}>{movie.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: '#8D021F', fontWeight: 'bold' }}>
          Close
        </Button>
        <Button variant="contained" style={{ background: '#BD2031', color: 'white', fontWeight: 'bold' }} onClick={handleBookClick}>
          Book
        </Button>
      </DialogActions>
    </Dialog>

    <Dialog open={showProjectionsModal} onClose={handleCloseProjectionsModal}>
    <DialogTitle>AVAILABLE SCREENS</DialogTitle>
        <DialogContent className={classes.modalContent}>
          {projections.map((projection) => (
             <Typography
             key={projection.id}
             variant="body1"
             className={`${classes.projectionItem} ${
               selectedProjection === projection ? classes.selectedProjection : ''
             }`}
             onClick={() => handleProjectionSelect(projection)}
           >
             {formatProjectionDateTime(projection.date, projection.heure)}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProjectionsModal} style={{ color: '#8D021F'}}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedProjection) {
                console.log('Selected projection:', selectedProjection);
                 console.log('Selected movie:', selectedMovie);
                 window.location.href = `/client/Book?movieId=${selectedMovie.id}&projectionId=${selectedProjection.id}`;
              } else {
                alert('Please select a projection.');
              }
            }}
            style={{ background: '#8D021F', color: 'white' }}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
      

    </>
  );
};

export default MovieModal;
