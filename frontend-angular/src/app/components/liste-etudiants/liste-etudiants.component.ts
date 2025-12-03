import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etudiant } from '../model/etudiant';
import { Note } from '../model/note.model';
import { EtudiantService } from '../../services/etudiant.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-liste-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.scss']
})
export class ListeEtudiantsComponent implements OnInit {
  showToast = false;
  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;

  notes: Note[] = [];

  newNote: Note = {
    etudiantId: 0,
    module: '',
    valeur: 0,
    session: 'Ordinaire'
  };

  isAdding = false;
  errorMessage: string | null = null;

  constructor(
    private etudiantService: EtudiantService,   // ✅ NOM CORRECT
    private noteService: NoteService            // ✅ NOM CORRECT
  ) {}

  ngOnInit(): void {
    this.etudiantService.getAll().subscribe(data => {
      this.etudiants = data;
    });
  }

  voirNotes(e: Etudiant) {
    this.selectedEtudiant = e;
    this.errorMessage = null;

    this.newNote = {
      etudiantId: e.id,
      module: '',
      valeur: 0,
      session: 'Ordinaire'
    };

    this.noteService.getNotesByEtudiant(e.id).subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (err) => {
        console.error('Erreur chargement notes', err);
        this.notes = [];
        this.errorMessage = 'Erreur lors du chargement des notes.';
      }
    });
  }

  fermerPanel() {
    this.selectedEtudiant = null;
    this.notes = [];
    this.errorMessage = null;
  }

  ajouterNote() {
    if (!this.selectedEtudiant) return;

    this.errorMessage = null;
    this.isAdding = true;
    this.newNote.etudiantId = this.selectedEtudiant.id;

    this.noteService.addNote(this.newNote).subscribe({
      next: (addedNote) => {
        this.notes.push(addedNote);

        // Réinitialiser le formulaire
        this.newNote = {
          etudiantId: this.selectedEtudiant!.id,
          module: '',
          valeur: 0,
          session: 'Ordinaire'
        };
        this.isAdding = false;

        // 👇 AFFICHER LA NOTIFICATION PENDANT 3 SECONDES
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
      },
      error: (err) => {
        console.error('Erreur ajout note : ', err);
        this.errorMessage = "Impossible d'ajouter la note.";
        this.isAdding = false;
      }
    });

  }
}
