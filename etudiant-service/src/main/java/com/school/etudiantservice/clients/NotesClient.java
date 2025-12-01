package com.school.etudiantservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "note-service")  // NOM EXACT DANS EUREKA
public interface NotesClient {

    @GetMapping("/api/notes/etudiant/{id}")
    Object getNotesByEtudiant(@PathVariable("id") Long id);
}
