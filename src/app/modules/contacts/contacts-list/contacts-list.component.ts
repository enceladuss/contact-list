import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { MatButton } from '@angular/material/button';
import { ContactCardComponent } from './components/contact-card/contact-card.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchInputComponent,
    MatButton,
    ContactCardComponent
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {

  constructor() {
  }

  public onSearch(query: string) {
    console.log(query);
  }

}
