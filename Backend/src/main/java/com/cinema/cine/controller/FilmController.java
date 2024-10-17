package com.cinema.cine.controller;

import com.cinema.cine.entity.Categorie;
import com.cinema.cine.entity.Film;
import com.cinema.cine.service.CategorieService;
import com.cinema.cine.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/film")
@CrossOrigin
public class FilmController {

    @Autowired
    private FilmService filmService;


    @Autowired
    private CategorieService categorieService;


    @PostMapping("/add")
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        //Film addedFilm = filmService.addFilm(film);
       // return new ResponseEntity<>(addedFilm, HttpStatus.CREATED);

        Categorie categorie = categorieService.getCategorieById(film.getIdCategorie().getId());
        if (categorie == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        film.setIdCategorie(categorie); // Set the category for the film
        Film addedFilm = filmService.addFilm(film);
        return new ResponseEntity<>(addedFilm, HttpStatus.CREATED);
    }


    @GetMapping("/getFilm")
    public ResponseEntity<List<Film>> getAllFilms() {
       // List<Film> films = filmService.getAllFilms();
        //return new ResponseEntity<>(films, HttpStatus.OK);

        List<Film> filmsWithCategories = filmService.getAllFilms();
        if (filmsWithCategories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(filmsWithCategories, HttpStatus.OK);

    }


    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Integer id) {
        Film film = filmService.getFilmById(id);
        if (film == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable Integer id, @RequestBody Film updatedFilm) {
        Film film = filmService.updateFilm(id, updatedFilm);
        if (film == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable Integer id) {
        filmService.deleteFilm(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getFilmCount() {
        long count = filmService.getFilmCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    @PostMapping(value = "/uploadImage", consumes = {"multipart/form-data"})
    public Film uploadImage(@RequestParam("id") Integer id,
                            @RequestParam("poster") MultipartFile file) throws IOException {
        return filmService.uploadImage(id, file);
    }
}
