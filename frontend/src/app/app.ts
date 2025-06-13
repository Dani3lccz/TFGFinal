import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule // Importa el módulo de rutas para usar <router-outlet>
  ],
  template: `
    <router-outlet></router-outlet> <!-- Punto de entrada para las rutas -->
  `
})
export class App { }
