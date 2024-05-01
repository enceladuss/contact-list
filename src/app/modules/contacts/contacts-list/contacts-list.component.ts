import { Component, DestroyRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { MatButton } from '@angular/material/button';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import {MatDialog} from "@angular/material/dialog";
import {
  ManageContactDialogComponent
} from "../../../shared/components/manage-contact-dialog/manage-contact-dialog.component";
import { ContactsService } from '../services/contacts.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogActionsEnum } from '../../../shared/enums/dialogActions.enum';
import { ManageContactDialogResultInterface } from '../../../shared/interfaces/manageContactDialogResult.interface';
import { Observable } from 'rxjs';
import { ContactInterface } from '../interfaces/contact.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchInputComponent,
    MatButton,
    ContactCardComponent,
    AsyncPipe
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit {

  public contacts$: Observable<ContactInterface[]> | null = null;

  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private destroyRef: DestroyRef,
  ) {}

  public ngOnInit() {
    this.contacts$ = this.contactsService.getContacts();
  }

  public onSearch(query: string): void {
    this.contacts$ = this.contactsService.searchContacts(query);
  }

  public addContact(): void {
    let data = {heading: 'Add new contact'};
    let dialogRef = this.dialog.open(ManageContactDialogComponent, { data });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ManageContactDialogResultInterface) => {
        if (data?.result === DialogActionsEnum.Confirm) {
          this.contactsService.addContact(data.contactData);
        }
      });
  }

}
