package com.cinema.cine.service;

import com.cinema.cine.entity.Admin;
import com.cinema.cine.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            throw new RuntimeException("L'email fourni n'est associé à aucun compte.");
        }
        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Le mot de passe fourni est incorrect.");
        }
        return admin;
    }
}

