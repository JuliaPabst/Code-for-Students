import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from '../app/register/register.component'; // Importiere RegisterComponent
import { HttpClientModule } from '@angular/common/http'; // Importiere HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HttpClientModule, // Füge HttpClientModule zu den Imports hinzu
    RegisterComponent // Füge RegisterComponent zu den Imports hinzu
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentView = 'home';
  title = 'Frontend';
}
