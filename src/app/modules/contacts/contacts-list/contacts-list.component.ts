import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchInputComponent,
    MatButton
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
