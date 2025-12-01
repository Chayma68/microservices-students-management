
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface = forme d'un étudiant renvoyé par ton backend
export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  cne: string;
  filiere: string;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = '/api/etudiants'; // grâce au proxy, ira vers Spring Boot

  constructor(private http: HttpClient) {}

  getAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }
}
