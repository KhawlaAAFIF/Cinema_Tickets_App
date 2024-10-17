package com.cinema.cine.controller;

import com.cinema.cine.entity.Film;
import com.cinema.cine.entity.Projection;
import com.cinema.cine.entity.Salle;
import com.cinema.cine.service.FilmService;
import com.cinema.cine.service.ProjectionService;
import com.cinema.cine.service.SalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projection")
@CrossOrigin
public class ProjectionController {

    @Autowired
    private ProjectionService projectionService;

    @Autowired
    private FilmService filmService;

    @Autowired
    private SalleService salleService;

    @PostMapping("/add")
    public ResponseEntity<Projection> addProjection(@RequestBody Projection projection) {
        Film film = filmService.getFilmById(projection.getIdFilm().getId());
        if (film == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Salle salle = salleService.getSalleById(projection.getIdSalle().getId());
        if (salle == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        projection.setIdFilm(film);
        projection.setIdSalle(salle);

        Projection addedProjection = projectionService.addProjection(projection);

        return new ResponseEntity<>(addedProjection, HttpStatus.CREATED);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Projection>> getAllProjections() {
        List<Projection> projections = projectionService.getAllProjections();
        if (projections.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(projections, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projection> getProjectionById(@PathVariable Integer id) {
        Projection projection = projectionService.getProjectionById(id);
        if (projection == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(projection, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Projection> updateProjection(@PathVariable Integer id, @RequestBody Projection updatedProjection) {
        Projection projection = projectionService.updateProjection(id, updatedProjection);
        if (projection == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(projection, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProjection(@PathVariable Integer id) {
        projectionService.deleteProjection(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/film/{idFilm}")
    public ResponseEntity<List<Projection>> getProjectionsByFilmId(@PathVariable Integer idFilm) {
        List<Projection> projections = projectionService.getProjectionsByFilmId(idFilm);
        if (projections.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(projections, HttpStatus.OK);
    }
}
