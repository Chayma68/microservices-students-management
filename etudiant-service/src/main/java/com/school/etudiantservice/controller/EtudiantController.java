package com.school.etudiantservice.controller;

import com.school.etudiantservice.clients.NotesClient;
import com.school.etudiantservice.entity.Etudiant;
import com.school.etudiantservice.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    private final EtudiantRepository etudiantRepository;

    public EtudiantController(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @GetMapping
    public List<Etudiant> getAll() {
        return etudiantRepository.findAll();
    }

    @PostMapping
    public Etudiant create(@RequestBody Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> getById(@PathVariable Long id) {
        return etudiantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cne/{cne}")
    public ResponseEntity<Etudiant> getByCne(@PathVariable String cne) {
        return etudiantRepository.findByCne(cne)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!etudiantRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        etudiantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @Autowired
    private NotesClient notesClient;

    @GetMapping("/{id}/notes")
    public Object getNotes(@PathVariable Long id) {

        return notesClient.getNotesByEtudiant(id);
    }

}
