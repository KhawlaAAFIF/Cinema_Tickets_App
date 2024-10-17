package com.cinema.cine.controller;

import com.cinema.cine.entity.Salle;
import com.cinema.cine.service.SalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salle")
@CrossOrigin
public class SalleController {
    @Autowired
    private SalleService salleService;

    @GetMapping("/getAll")
    public List<Salle> getSalles() {
        return salleService.getAllSalles();
    }

    @GetMapping("/{id}")
    public Salle getSalle(@PathVariable Integer id) {
        return salleService.getSalleById(id);
    }

    @PostMapping("/add")
    public Salle createSalleCon(@RequestBody Salle salle) {
        return salleService.createSalle(salle);
    }

    @PutMapping("/{id}")
    public Salle updateSalleCon(@PathVariable Integer id, @RequestBody Salle salle) {
        return salleService.updateSalle(id, salle);
    }

    @DeleteMapping("/{id}")
    public void deleteSalleCon(@PathVariable Integer id) {
        salleService.deleteSalle(id);
    }
}
