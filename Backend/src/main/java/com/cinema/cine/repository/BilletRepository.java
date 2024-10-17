package com.cinema.cine.repository;

import com.cinema.cine.entity.Billet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BilletRepository extends JpaRepository<Billet, Integer> {

}
