import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MovieModal from './Modal'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '350px',
    height: '500px',
    margin: '10px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px',
    background: 'rgba(0, 0, 0, 0)',
    color: '#fff',
    transition: 'background 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.6)',
    },
  },
});

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card className={classes.card} onClick={handleOpenModal}>
        <img src={movie.poster} alt={movie.title} className={classes.cardImage} />
        <div className={classes.overlay}>
          <Typography variant="h5" gutterBottom>
            {movie.titre}
          </Typography>
          <Typography variant="body2">
            Duration: {movie.duree}
          </Typography>
        </div>
      </Card>
      <MovieModal open={openModal} onClose={handleCloseModal} movie={movie} />
    </>
  );
};

export default MovieCard;
