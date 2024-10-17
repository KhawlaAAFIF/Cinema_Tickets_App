package com.cinema.cine.controller;


import com.cinema.cine.entity.*;
import com.cinema.cine.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservation")
@CrossOrigin
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private BilletService billetService;

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/add")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {

        Utilisateur utilisateur = utilisateurService.getUserById(reservation.getIdUtilisateur().getId());
        if (utilisateur == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Billet billet = billetService.getBilletById(reservation.getIdBillet().getId());
        if (billet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        reservation.setIdBillet(billet);
        reservation.setIdUtilisateur(utilisateur);

        Reservation addedReservation = reservationService.addReservation(reservation);
        return new ResponseEntity<>(addedReservation, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Integer id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        return reservation.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Integer id, @RequestBody Reservation reservation) {
        try {
            Reservation updatedReservation = reservationService.updateReservation(id, reservation);
            return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Integer id) {
        reservationService.deleteReservation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getReservationsCount() {
        long count = reservationService.getReservationCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
