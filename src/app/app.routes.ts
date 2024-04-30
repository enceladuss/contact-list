import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadChildren: () => import('./modules/contacts/contacts.routes').then(x => x.ContactsRoutes),
  },
  {
    path: '**',
    redirectTo: 'contacts'
  }
];
