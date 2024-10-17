import React, {useState,useEffect} from 'react';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import filmService from '../service/filmService';
import categoryService from '../service/categoryService';
import '../styles/addFilm.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'; 
import { useNavigate, useParams } from 'react-router-dom';

const AddFilmContainer = () => {
  const [filmData, setFilmData] = React.useState({
    titre: '',
    description: '',
    duree: '',
    dateSortie: '',  
    idCategorie: '',  
  });
  const [categories, setCategories] = useState([]);
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchFilmDetails(id);
      if (window.location.search.includes('display=true')) {
        setIsDisplayMode(true);
      } else {
        setIsEditMode(true);
      }
    }
  }, [id]);

  const fetchFilmDetails = async (filmId) => {
    try {
      const filmDetails = await filmService.getFilmById(filmId);
      setFilmData(filmDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await categoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilmData({
      ...filmData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const formattedData = {
        ...filmData,
        idCategorie: { id: filmData.idCategorie } 
      };
      if (!filmData.idCategorie) {
        console.error('Category is required.'); 
        return;
      }
      if (id) {
        await filmService.updateFilm(id, formattedData);
      } else {
        await filmService.addFilm(formattedData);
      }
      navigate('/admin/films');
    } catch (error) {
      console.error('API Error:', error.response.data);
    }
  };
  const CategorySelect = () => (
    <FormControl fullWidth>
      <InputLabel htmlFor="category">Category</InputLabel>
      <Select
        name="idCategorie"
        value={isDisplayMode ? filmData.idCategorie.id : (isEditMode ? filmData.idCategorie.id : filmData.idCategorie)}
        onChange={handleChange}
        disabled={isDisplayMode}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>{category.genre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );


  const FormButtons = () => {
    if (isDisplayMode) {
      return (
        <>
          <button type="button" onClick={() => navigate(-1)}>Go Back</button>
        </>
      );
    } else if (isEditMode) {
      return (
        <>
          <button type="button" onClick={() => navigate(-1)}>Go Back</button>
          <button type="submit">Update Film</button>
        </>
      );
    } else {
      return (
        <>
          <button type="button" onClick={() => navigate(-1)}>Go Back</button>
          <button type="submit">Add Film</button>
        </>
      );
    }
  };
  
  return (
    
    <div className='add-film'>
      <Form onSubmit={handleSubmit}>
      <h1>{isDisplayMode? 'View Film' : id? 'Update Film' : 'Add Film'}</h1>
       <label htmlFor='titre'>Title</label>
        <InputBox
          type="text"
          placeholder="titre"
          name="titre"
          value={filmData.titre}
          onChange={handleChange}
          disabled={isDisplayMode}
        />
        <label htmlFor='description'>Description</label>
        <InputBox
          type="text"
          placeholder="description"
          name="description"
          value={filmData.description}
          onChange={handleChange}
          disabled={isDisplayMode}
        />
        <label htmlFor='duree'>Duration</label>
        <InputBox
          type="text"
          placeholder="duree"
          name="duree"
          value={filmData.duree}
          onChange={handleChange}
          disabled={isDisplayMode}
        />
        <label htmlFor='dateSortie'>Release date</label>
        <InputBox
          type="date"
          placeholder="dateSortie"
          name="dateSortie"
          value={filmData.dateSortie}
          onChange={handleChange}
          disabled={isDisplayMode}
        />
         <div className="add-film__category">
          <label htmlFor="category">Category</label>
          <CategorySelect />
          </div>
          <FormButtons />
      </Form>
    </div>
  );
};

export default AddFilmContainer;

