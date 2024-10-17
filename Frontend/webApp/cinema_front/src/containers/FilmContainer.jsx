import React, { useEffect, useState }  from 'react';
import DataGridComponent from '../components/DataGridComponent';
import filmService from '../service/filmService';
import { useNavigate  } from 'react-router-dom';
import '../styles/addFilm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';

const FilmContainer = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {

    loadFilms();
  }, []);

  const loadFilms = async () => {
    const allFilms = await filmService.getAllFilms();
    setFilms(allFilms.map((film) => ({
      ...film,
      genre: film.idCategorie?.genre,
    })));
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'titre', headerName: 'Titre', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 120 },
    { field: 'duree', headerName: 'Durée', width: 110 },
    { field: 'dateSortie', headerName: 'Date de sortie', width: 160 },
  ];
  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/admin/films/edit/${row.id}`);
  };

 
  const addfilm = (e) => {
    e.preventDefault();
    navigate('/admin/films/add');
  }
  const handleDeleteClick = (row) => {
    const film=films.find(film=>film.id===row.id)
    filmService.deleteFilm(film.id).then(()=>{
      loadFilms();
    })
  };

  const handleDisplayClick = (row) => {
    navigate(`/admin/films/edit/${row.id}?display=true`);
  };

  return (
    <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1">
    <div style={{ position: 'relative', top: '20px', left: '20%' }}>
        <h1><b>Movies</b></h1>
      </div>
      <div className="d-flex justify-content-end mb-3 data-grid">
      <button onClick={addfilm} className='add-mov'>add film</button>
      </div>
    <DataGridComponent
      columns={columns}
      rows={films}
      pageSizeOptions={[5]}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      showActionColumn={true}
      showDisplayIcon={true}
      onDisplayClick={handleDisplayClick}
    />
    </div>
    </div>
  );
};

export default FilmContainer;
