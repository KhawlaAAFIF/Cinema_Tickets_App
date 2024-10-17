package com.cinema.cine.repository;

import com.cinema.cine.entity.Projection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectionRepository extends JpaRepository<Projection, Integer> {
    @Query("SELECT p FROM Projection p WHERE p.idFilm.id = :idFilm")
    public List<Projection> findByFilmId(@Param("idFilm") Integer idFilm);
}
