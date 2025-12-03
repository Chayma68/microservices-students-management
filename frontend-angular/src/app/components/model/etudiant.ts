import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// === Modèles ===
export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  cne: string;
  filiere: string;
}

export interface Note {
  id: number;
  module: string;
  valeur: number;
  session: string;
}

export interface CreateNotePayload {
  module: string;
  valeur: number;
  session: string;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  // URLs exposées par ton API Gateway
  private etudiantsUrl = 'http://localhost:8080/etudiant-service/api/etudiants';
  private notesUrl = 'http://localhost:8080/note-service/api/notes';

  constructor(private http: HttpClient) {}

  /** Récupérer tous les étudiants */
  getAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.etudiantsUrl);
  }

  /** Récupérer les notes d'un étudiant */
  getNotesByEtudiant(id: number): Observable<Note[] | Note | null> {
    return this.http.get<Note[] | Note | null>(`${this.etudiantsUrl}/${id}/notes`);
  }

  /** Ajouter une note pour un étudiant */
  addNoteForEtudiant(etudiantId: number, note: CreateNotePayload): Observable<Note> {
    const payload = { ...note, etudiantId };
    return this.http.post<Note>(this.notesUrl, payload);
  }
}
