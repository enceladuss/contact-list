import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { MatButton } from '@angular/material/button';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import {MatDialog} from "@angular/material/dialog";
import {
  ManageContactDialogComponent
} from "../../../shared/components/manage-contact-dialog/manage-contact-dialog.component";

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
export class ContactsListComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  public ngOnInit() {
    let data = {heading: 'Add new contact'};
    this.dialog.open(ManageContactDialogComponent, { data });
  }

  public onSearch(query: string) {
    console.log(query);
  }

}
