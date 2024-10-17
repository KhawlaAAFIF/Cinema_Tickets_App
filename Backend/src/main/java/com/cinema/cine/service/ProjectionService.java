package com.cinema.cine.service;

import com.cinema.cine.entity.Projection;
import com.cinema.cine.repository.ProjectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectionService {

    @Autowired
    private ProjectionRepository projectionRepository;

    public Projection addProjection(Projection projection) {
        return projectionRepository.save(projection);
    }

    public List<Projection> getAllProjections() {
        return projectionRepository.findAll();
    }

    public Projection getProjectionById(Integer id) {
        return projectionRepository.findById(id).orElse(null);
    }

    public Projection updateProjection(Integer id, Projection updatedProjection) {
        Projection existingProjection = projectionRepository.findById(id).orElse(null);
        if (existingProjection != null) {
            updatedProjection.setId(id);
            return projectionRepository.save(updatedProjection);
        }
        return null;
    }

    public void deleteProjection(Integer id) {
        projectionRepository.deleteById(id);
    }

    public List<Projection> getProjectionsByFilmId(Integer idFilm) {
        return projectionRepository.findByFilmId(idFilm);
    }
}

