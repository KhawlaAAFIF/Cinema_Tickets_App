package com.cinema.cine.controller;

import com.cinema.cine.entity.Film;
import com.cinema.cine.entity.Utilisateur;
import com.cinema.cine.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/utilisateur")
@CrossOrigin
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> registerUtilisateur(@RequestBody Utilisateur user) {
        Utilisateur registeredUser = utilisateurService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Utilisateur> loginUtilisateur(@RequestBody Utilisateur user) {
        Utilisateur loggedInUser = utilisateurService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }


    @GetMapping("/{email}")
    public ResponseEntity<Utilisateur> getUserByEmail(@PathVariable String email) {
        Utilisateur user = utilisateurService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/getAll")
    public List<Utilisateur> getUsers() {
        return utilisateurService.getAllUsers();
    }
    @GetMapping("/byid/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Integer id) {
        Utilisateur user = utilisateurService.getUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getUsersCount() {
        long count = utilisateurService.getUsersCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Integer id, @RequestBody Utilisateur updateUser) {
        Utilisateur utilisateur = utilisateurService.updateUser(id, updateUser);
        if (utilisateur == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(utilisateur, HttpStatus.OK);
    }
}

