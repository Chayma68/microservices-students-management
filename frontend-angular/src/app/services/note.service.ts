import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../components/model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // URL Gateway vers le service Note
  // Vérifie si ton gateway prefixe est /api/notes ou /note-service/api/notes
  private API_URL = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) {}

  // Récupérer les notes d'un étudiant spécifique
  getNotesByEtudiant(etudiantId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.API_URL}/etudiant/${etudiantId}`);
  }

  // Ajouter une note
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.API_URL, note);
  }
}
