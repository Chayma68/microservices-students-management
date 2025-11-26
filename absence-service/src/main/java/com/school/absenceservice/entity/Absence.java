package com.school.absenceservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long etudiantId;        // référence à l'étudiant (id dans etudiant-service)
    private LocalDate dateAbsence;
    private String module;
    private boolean justifie;

    public Absence() {
    }

    public Absence(Long etudiantId, LocalDate dateAbsence, String module, boolean justifie) {
        this.etudiantId = etudiantId;
        this.dateAbsence = dateAbsence;
        this.module = module;
        this.justifie = justifie;
    }

    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public LocalDate getDateAbsence() {
        return dateAbsence;
    }

    public void setDateAbsence(LocalDate dateAbsence) {
        this.dateAbsence = dateAbsence;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public boolean isJustifie() {
        return justifie;
    }

    public void setJustifie(boolean justifie) {
        this.justifie = justifie;
    }
}
