import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../components/model/etudiant'; // Import du modèle séparé

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  // URL via le Gateway (adapte si besoin : /etudiant-service/api/etudiants ou juste /api/etudiants)
  private API_URL = 'http://localhost:8080/api/etudiants';

  constructor(private http: HttpClient) {}

  // ✅ Renommé de 'getAll' à 'getEtudiants' pour matcher le Component
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.API_URL);
  }

  // ✅ Ajouté pour le bouton "Nouvel Étudiant"
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.API_URL, etudiant);
  }

  // ✅ Ajouté pour le bouton "Supprimer"
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
