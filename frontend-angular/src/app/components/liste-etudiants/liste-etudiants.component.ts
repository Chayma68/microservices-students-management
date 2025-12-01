import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantService, Etudiant } from '../../services/etudiant';

@Component({
  selector: 'app-liste-etudiants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.scss']
})
export class ListeEtudiantsComponent implements OnInit {

  etudiants: Etudiant[] = [];
  loading = true;
  error: string | null = null;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.getAll().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des étudiants';
        this.loading = false;
      }
    });
  }
}
