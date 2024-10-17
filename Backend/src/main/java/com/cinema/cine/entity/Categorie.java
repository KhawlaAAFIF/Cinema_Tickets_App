package com.cinema.cine.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categorie")
public class Categorie {
    @Id
    @Column(name = "id_categorie", nullable = false)
    private Integer id;

    @Column(name = "genre", nullable = false, length = 100)
    private String genre;

}