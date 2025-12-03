import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../components/model/note.model';   // ✅ BON IMPORT

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // Si tu passes par l’API Gateway :
  private apiUrl = 'http://localhost:8080/api/notes';

  // Si tu veux appeler directement le microservice note-service :
  // private apiUrl = 'http://localhost:8083/api/notes';

  constructor(private http: HttpClient) {}

  // 📌 Récupérer les notes d'un étudiant
  getNotesByEtudiant(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/etudiant/${id}`);
  }

  // 📌 Ajouter une note
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }
}
