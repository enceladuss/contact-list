import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';

export const ContactsRoutes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    providers: [],
    children: [
      {
        path: 'list',
        loadChildren: () => import('./contacts-list/contacts-list.routes').then(x => x.ContactsListRoutes)
      },
      {
        path: 'profile/:slug',
        loadChildren: () => import('./profile/profile.routes').then(x => x.ProfileRoutes)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
]
