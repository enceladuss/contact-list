import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsService } from './modules/contacts/services/contacts.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private contactsService: ContactsService) {
    this.contactsService.createDummyContacts();
  }

}
