import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. Imports des Services
import { EtudiantService } from '../../services/etudiant.service';
import { NoteService } from '../../services/note.service';
import { AbsenceService, Absence } from '../../services/absence.service';

// 2. Imports des Modèles
import { Etudiant } from '../model/etudiant';
import { Note } from '../model/note.model';

@Component({
  selector: 'app-liste-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule], // Indispensable pour *ngIf, *ngFor et [(ngModel)]
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.scss']
})
export class ListeEtudiantsComponent implements OnInit {

  // --- DONNÉES PRINCIPALES ---
  etudiants: Etudiant[] = [];
  notes: Note[] = [];
  absences: Absence[] = [];

  // --- ÉTAT DE L'INTERFACE (UI) ---
  selectedEtudiant: Etudiant | null = null;
  activeTab: 'notes' | 'absences' = 'notes';

  isLoading = false;
  errorMessage = '';

  // --- NOTIFICATIONS ---
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // --- FORMULAIRES ---
  showAddStudentModal = false;

  // 1. Nouvel Étudiant
  newStudent: Etudiant = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    cne: '',
    filiere: ''
  };

  // 2. Nouvelle Note
  newNote: any = { // 'any' permet de gérer souplement l'ajout de l'objet étudiant
    module: '',
    valeur: 0,
    session: 'Ordinaire'
  };

  // 3. Nouvelle Absence
  newAbsence: any = { // Utilisation de 'any' pour faciliter la liaison avec l'étudiant
    date: new Date().toISOString().split('T')[0],
    matiere: '',
    justifiee: false
  };

  constructor(
    private etudiantService: EtudiantService,
    private noteService: NoteService,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    this.chargerEtudiants();
  }

  // =========================================================
  // 1. GESTION DES ÉTUDIANTS
  // =========================================================

  chargerEtudiants() {
    this.isLoading = true;
    this.etudiantService.getEtudiants().subscribe({
      next: (data: Etudiant[]) => {
        this.etudiants = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Erreur chargement étudiants:", err);
        this.isLoading = false;
      }
    });
  }

  ajouterEtudiant() {
    if (!this.newStudent.nom || !this.newStudent.prenom) {
      this.afficherToast("Nom et Prénom obligatoires", 'error');
      return;
    }

    this.etudiantService.addEtudiant(this.newStudent).subscribe({
      next: (etudiantCree) => {
        this.etudiants.push(etudiantCree);
        this.showAddStudentModal = false;
        // Reset du formulaire
        this.newStudent = { id: 0, nom: '', prenom: '', email: '', cne: '', filiere: '' };
        this.afficherToast("Étudiant ajouté avec succès !");
      },
      error: (err) => {
        console.error(err);
        this.afficherToast("Erreur lors de la création", 'error');
      }
    });
  }

  supprimerEtudiant(id: number, event: Event) {
    event.stopPropagation();
    if (confirm("Supprimer cet étudiant ?")) {
      this.etudiantService.deleteEtudiant(id).subscribe({
        next: () => {
          this.etudiants = this.etudiants.filter(e => e.id !== id);
          if (this.selectedEtudiant?.id === id) {
            this.fermerPanel();
          }
          this.afficherToast("Étudiant supprimé.");
        },
        error: (err) => this.afficherToast("Erreur suppression", 'error')
      });
    }
  }

  // =========================================================
  // 2. PANEL LATÉRAL
  // =========================================================

  ouvrirPanel(etudiant: Etudiant) {
    this.selectedEtudiant = etudiant;
    this.activeTab = 'notes';
    this.chargerDonneesPanel();
  }

  fermerPanel() {
    this.selectedEtudiant = null;
    this.notes = [];
    this.absences = [];
  }

  chargerDonneesPanel() {
    if (!this.selectedEtudiant) return;
    const id = this.selectedEtudiant.id;

    // Charger les Notes
    this.noteService.getNotesByEtudiant(id).subscribe({
      next: (data) => this.notes = data,
      error: () => console.error("Erreur notes")
    });

    // Charger les Absences
    this.absenceService.getAbsencesByEtudiant(id).subscribe({
      next: (data) => this.absences = data,
      error: () => console.error("Erreur absences")
    });
  }

  // =========================================================
  // 3. GESTION DES NOTES
  // =========================================================

  ajouterNote() {
    if (!this.selectedEtudiant) return;

    // On construit l'objet exactement comme le Backend NoteService l'attend
    // Souvent en microservice, c'est "etudiantId" (type number)
    const noteAEnvoyer = {
      ...this.newNote,
      etudiantId: this.selectedEtudiant.id, // <--- C'EST LA CLÉ
      etudiant: null // On évite d'envoyer l'objet complet pour ne pas embrouiller le backend
    };

    this.isLoading = true;
    console.log("Envoi de la note au backend :", noteAEnvoyer); // Regarde ta console F12 !

    this.noteService.addNote(noteAEnvoyer).subscribe({
      next: (noteAjoutee) => {
        console.log("Note ajoutée avec succès :", noteAjoutee);
        this.notes.push(noteAjoutee);
        this.isLoading = false;
        this.afficherToast("Note ajoutée !");

        // Reset
        this.newNote = { module: '', valeur: 0, session: 'Ordinaire' };
      },
      error: (err) => {
        console.error("ERREUR BACKEND NOTE :", err);
        this.isLoading = false;
        this.afficherToast("Erreur ajout note", 'error');
      }
    });
  }

  ajouterAbsence() {
    if (!this.selectedEtudiant) return;

    const absenceAEnvoyer = {
      ...this.newAbsence,
      etudiantId: this.selectedEtudiant.id, // <--- Utilisation de l'ID
      etudiant: null
    };

    this.isLoading = true;
    console.log("Envoi de l'absence au backend :", absenceAEnvoyer);

    this.absenceService.addAbsence(absenceAEnvoyer).subscribe({
      next: (absenceAjoutee) => {
        console.log("Absence ajoutée :", absenceAjoutee);
        this.absences.push(absenceAjoutee);
        this.isLoading = false;
        this.afficherToast("Absence signalée.");

        // Reset
        this.newAbsence = { date: new Date().toISOString().split('T')[0], matiere: '', justifiee: false };
      },
      error: (err) => {
        console.error("ERREUR BACKEND ABSENCE :", err);
        this.isLoading = false;
        this.afficherToast("Erreur ajout absence", 'error');
      }
    });
  }

  // =========================================================
  // 5. TOAST (Notifications)
  // =========================================================

  afficherToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
