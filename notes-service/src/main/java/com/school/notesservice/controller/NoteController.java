package com.school.notesservice.controller;

import com.school.notesservice.entity.Note;
import com.school.notesservice.repository.NoteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepository;

    //  Injection du repository via le constructeur (Dependency Injection)
    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // GET /api/notes → récupérer toutes les notes
    @GetMapping
    public List<Note> getAll() {
        return noteRepository.findAll();
    }

    //  POST /api/notes → créer une nouvelle note
    @PostMapping
    public Note create(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    //  GET /api/notes/{id} → récupérer une note par son id
    @GetMapping("/{id}")
    public ResponseEntity<Note> getById(@PathVariable Long id) {
        return noteRepository.findById(id)
                .map(ResponseEntity::ok)                // 200 OK + body
                .orElse(ResponseEntity.notFound().build()); // 404 Not Found
    }

    //  GET /api/notes/etudiant/{etudiantId} → toutes les notes d’un étudiant
    @GetMapping("/etudiant/{etudiantId}")
    public List<Note> getByEtudiant(@PathVariable Long etudiantId) {
        return noteRepository.findByEtudiantId(etudiantId);
    }

    // DELETE /api/notes/{id} → supprimer une note
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!noteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();   // 404 si l'id n'existe pas
        }
        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();      // 204 No Content si OK
    }
}
