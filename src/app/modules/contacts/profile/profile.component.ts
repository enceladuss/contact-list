import { Component, DestroyRef, OnInit } from '@angular/core';
import {ContactCardComponent} from "../contacts-list/components/contact-card/contact-card.component";
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {MatButton} from "@angular/material/button";
import {SearchInputComponent} from "../../../shared/components/search-input/search-input.component";
import { ContactsService } from '../services/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ManageContactDialogResultInterface } from '../../../shared/interfaces/manageContactDialogResult.interface';
import { DialogActionsEnum } from '../../../shared/enums/dialogActions.enum';
import { ContactInterface } from '../interfaces/contact.interface';
import { DatePipe } from '@angular/common';
import {
  ManageContactDialogComponent
} from '../../../shared/components/manage-contact-dialog/manage-contact-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ContactCardComponent,
    HeaderComponent,
    MatButton,
    SearchInputComponent,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private slug!: string | null;
  public contact: ContactInterface | null = null;

  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef,
  ) { }

  public ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  private fetchData(): void {
    if (this.slug) {
      this.contactsService.getContact(this.slug)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data: ContactInterface | undefined) => {
          if (!!data) {
            this.contact = data;
          } else {
            this.router.navigate(['/']);
          }
        });
    }
  }

  public editContact(): void {
    let data = {heading: 'Edit Contact', contactData: this.contact};
    let dialogRef = this.dialog.open(ManageContactDialogComponent, { data });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ManageContactDialogResultInterface) => {
        if (data?.result === DialogActionsEnum.Confirm) {
          this.contactsService.editContact(data.contactData);
          this.contact = data.contactData;
        } else if (data?.result === DialogActionsEnum.Delete) {
          this.contactsService.deleteContact(data.contactData.id);
          this.router.navigate(['/']);
        }
      });
  }

}
