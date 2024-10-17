package com.cinema.cine.service;

import com.cinema.cine.entity.Film;
import com.cinema.cine.repository.UtilisateurRepository;
import com.cinema.cine.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur registerUser(Utilisateur user) {
        Utilisateur existingClient = utilisateurRepository.findByEmail(user.getEmail());
        if (existingClient != null) {
            throw new RuntimeException("Client with this email already exists.");
        }
        return utilisateurRepository.save(user);
    }

    public Utilisateur loginUser(String email, String password) {
        Utilisateur user = utilisateurRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("L'email fourni n'est associé à aucun compte.");
        }
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Le mot de passe fourni est incorrect.");
        }
        return user;
    }

    public Utilisateur getUserByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }
    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUserById(Integer id) {
        return utilisateurRepository.findById(id).orElse(null);
    }
    public long getUsersCount() {
        return utilisateurRepository.count();
    }

    public Utilisateur updateUser(Integer id, Utilisateur updateUser) {
        Utilisateur existingUser = utilisateurRepository.findById(id).orElse(null);
        if (existingUser != null) {
            updateUser.setId(id);
            return utilisateurRepository.save(updateUser);
        }
        return null;
    }

}
