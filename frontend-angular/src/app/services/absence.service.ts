import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Absence {
  id?: number;
  etudiantId: number;
  date: string;
  matiere: string;
  justifiee: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private API_URL = 'http://localhost:8080/api/absences';

  constructor(private http: HttpClient) {}

  getAbsencesByEtudiant(etudiantId: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.API_URL}/etudiant/${etudiantId}`);
  }

  addAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(this.API_URL, absence);
  }
}
