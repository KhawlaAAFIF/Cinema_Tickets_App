package com.cinema.cine.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "film")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_film", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_categorie", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Categorie idCategorie;

    @Column(name = "titre", nullable = false, length = 100)
    private String titre;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "duree", nullable = false, length = 100)
    private String duree;

    @Column(name = "date_sortie", nullable = false)
    private LocalDate dateSortie;

    @Column(name = "poster" , length = 2000)
    private String poster;

}