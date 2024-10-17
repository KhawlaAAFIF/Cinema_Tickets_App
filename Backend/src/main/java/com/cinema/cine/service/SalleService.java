package com.cinema.cine.service;

import com.cinema.cine.entity.Salle;
import com.cinema.cine.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalleService {
    @Autowired
    private SalleRepository salleRepository;
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }
    public Salle getSalleById(int id) {
        return salleRepository.findById(id).orElseThrow();
    }

    public Salle createSalle(Salle salle) {
        return salleRepository.save(salle);
    }

    public Salle updateSalle(Integer id, Salle salle) {
        Salle existingSalle = getSalleById(id);
        existingSalle.setCapacite(salle.getCapacite());
        return salleRepository.save(existingSalle);
    }

    public void deleteSalle(Integer id) {
        salleRepository.deleteById(id);
    }

}
