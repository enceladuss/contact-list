import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogActionsEnum} from "../../enums/dialogActions.enum";
import {MatButton} from "@angular/material/button";
import {ManageContactDialogDataInterface} from "../../interfaces/manageContactDialogData.interface";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {emailRegex} from "../../../core/validators";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-manage-contact-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './manage-contact-dialog.component.html',
  styleUrl: './manage-contact-dialog.component.scss'
})
export class ManageContactDialogComponent implements OnInit {

  public contactForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ManageContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageContactDialogDataInterface
  ) { }

  public ngOnInit() {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.contactForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      emailAddress: new FormControl('', {validators: [Validators.required, Validators.pattern(emailRegex)], updateOn: 'change', }),
      birthDate: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      location: new FormControl('', [Validators.minLength(2), Validators.maxLength(80)]),
    });
  }

  public submitClick(): void {
    this.dialogRef.close(DialogActionsEnum.Confirm);
  }

}
