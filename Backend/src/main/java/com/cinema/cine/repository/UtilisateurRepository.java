package com.cinema.cine.repository;

import com.cinema.cine.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Integer> {
    Utilisateur findByEmail(String email);
}

