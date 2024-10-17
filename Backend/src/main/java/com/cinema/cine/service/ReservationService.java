package com.cinema.cine.service;

import com.cinema.cine.entity.Reservation;
import com.cinema.cine.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Integer id) {
        return reservationRepository.findById(id);
    }

    public Reservation updateReservation(Integer id, Reservation updatedReservation) {
        Optional<Reservation> existingReservation = reservationRepository.findById(id);
        if (existingReservation.isPresent()) {
            updatedReservation.setId(id);
            return reservationRepository.save(updatedReservation);
        } else {
            throw new RuntimeException("Reservation not found with id: " + id);
        }
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }
    public long getReservationCount() {
        return reservationRepository.count();
    }
}
