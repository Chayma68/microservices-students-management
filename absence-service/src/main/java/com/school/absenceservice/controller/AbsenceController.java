package com.school.absenceservice.controller;

import com.school.absenceservice.entity.Absence;
import com.school.absenceservice.repository.AbsenceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    private final AbsenceRepository absenceRepository;

    public AbsenceController(AbsenceRepository absenceRepository) {
        this.absenceRepository = absenceRepository;
    }

    @GetMapping
    public List<Absence> getAll() {
        return absenceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Absence> getById(@PathVariable Long id) {
        return absenceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/etudiant/{etudiantId}")
    public List<Absence> getByEtudiant(@PathVariable Long etudiantId) {
        return absenceRepository.findByEtudiantId(etudiantId);
    }

    @PostMapping
    public Absence create(@RequestBody Absence absence) {
        return absenceRepository.save(absence);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!absenceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        absenceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
