package com.cinema.cine.repository;

import com.cinema.cine.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepository  extends JpaRepository<Film, Integer> {
}
