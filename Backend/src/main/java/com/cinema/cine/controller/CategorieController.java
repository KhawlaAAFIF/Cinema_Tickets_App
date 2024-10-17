package com.cinema.cine.controller;

import com.cinema.cine.entity.Categorie;
import com.cinema.cine.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorie")
@CrossOrigin
public class CategorieController {

    @Autowired
    private CategorieService categorieService;


    @GetMapping("/getAll")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable Integer id) {
        Categorie categorie = categorieService.getCategorieById(id);
        if (categorie == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categorie, HttpStatus.OK);
    }

}
