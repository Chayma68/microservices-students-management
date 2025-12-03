import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeEtudiantsComponent } from './components/liste-etudiants/liste-etudiants.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListeEtudiantsComponent, MatToolbarModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
