package com.cinema.cine.service;

import com.cinema.cine.entity.Billet;
import com.cinema.cine.repository.BilletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BilletService {

    @Autowired
    private BilletRepository billetRepository;

    public Billet addBillet(Billet billet) {
        return billetRepository.save(billet);
    }

    public List<Billet> getAllBillets() {
        return billetRepository.findAll();
    }

    public Billet getBilletById(Integer id) {
        return billetRepository.findById(id).orElse(null);
    }

    public Billet updateBillet(Integer id, Billet updatedBillet) {
        Billet existingBillet = billetRepository.findById(id).orElse(null);
        if (existingBillet != null) {
            updatedBillet.setId(id);
            return billetRepository.save(updatedBillet);
        }
        return null;
    }

    public void deleteBillet(Integer id) {
        billetRepository.deleteById(id);
    }
}
