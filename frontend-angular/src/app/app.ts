import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeEtudiantsComponent } from './components/liste-etudiants/liste-etudiants.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListeEtudiantsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'frontend-angular';
}
