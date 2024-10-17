import React, { useState, useEffect } from 'react';
import MovieCard from '../components/card';
import filmService from '../service/filmService'; 
import ButtonAppBar from '../components/navbar';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await filmService.getAllFilms();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <ButtonAppBar />
      <br />
      <h2 style={{ margin: '20px', marginLeft: '100px', fontFamily: 'Verdana', fontWeight: 'bold'}}>AVAILABLE MOVIES</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <MovieCard movie={movie} />
            {(index + 1) % 3 === 0 && <div style={{ width: '100%', marginBottom: '20px' }} />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Movies;
