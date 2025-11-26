package com.school.etudiantservice.entity;

import jakarta.persistence.*;

@Entity
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cne;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    private String filiere;

    public Etudiant() {
    }

    public Etudiant(String cne, String nom, String prenom, String filiere) {
        this.cne = cne;
        this.nom = nom;
        this.prenom = prenom;
        this.filiere = filiere;
    }

    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getFiliere() {
        return filiere;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }
}
