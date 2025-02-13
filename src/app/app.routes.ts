// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; // Asegúrate de tener este componente
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: ChatComponent,
    providers: [
      importProvidersFrom(FormsModule), // Importar los proveedores de FormsModule
    ]
  },
  {
    path: 'chat/:admin',
    component: ChatComponent,
    providers: [
      importProvidersFrom(FormsModule), // Importar los proveedores de FormsModule
    ]
  }
];
