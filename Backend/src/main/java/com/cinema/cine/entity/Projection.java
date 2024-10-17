package com.cinema.cine.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "projection")
public class Projection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_projection", nullable = false)
    private Integer id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "heure", nullable = false)
    private LocalTime heure;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_film", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Film idFilm;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_salle", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Salle idSalle;

}