package com.school.notesservice.entity;

import jakarta.persistence.*;


@Entity
public class Note{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;
    private String module;
    private double valeur;
    private String session;

    public Note() {
    }
    public Note(Long etudiantId, String module, double valeur, String session) {
        this.etudiantId = etudiantId;
        this.module = module;
        this.valeur = valeur;
        this.session = session;
    }

    public Long getId() {
        return id;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public double getValeur() {
        return valeur;
    }

    public void setValeur(double valeur) {
        this.valeur = valeur;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }
}