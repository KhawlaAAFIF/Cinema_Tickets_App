package com.cinema.cine.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "billet")
public class Billet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_billet", nullable = false)
    private Integer id;

    @Column(name = "prix", nullable = false)
    private Double prix;

    @Column(name = "num_place", nullable = false)
    private Integer numPlace;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_projection", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Projection idProjection;

}