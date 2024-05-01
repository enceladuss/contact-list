import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogActionsEnum} from "../../enums/dialogActions.enum";
import {MatButton} from "@angular/material/button";
import {ManageContactDialogDataInterface} from "../../interfaces/manageContactDialogData.interface";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {emailRegex} from "../../../core/validators";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";
import { CUSTOM_DATE_FORMATS } from '../../../core/misc/formats';
import { NgxMaskDirective } from 'ngx-mask';
import { NgIf } from '@angular/common';
import { ManageContactDialogResultInterface } from '../../interfaces/manageContactDialogResult.interface';
import { SharedHelperService } from '../../services/shared-helper.service';

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
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskDirective,
    NgIf
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()
  ],
  templateUrl: './manage-contact-dialog.component.html',
  styleUrl: './manage-contact-dialog.component.scss'
})
export class ManageContactDialogComponent implements OnInit {

  public contactForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ManageContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManageContactDialogDataInterface,
    private helperService: SharedHelperService
  ) { }

  public ngOnInit() {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.contactForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]),
      emailAddress: new FormControl('', {validators: [Validators.required, Validators.pattern(emailRegex)], updateOn: 'change', }),
      birthDate: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
    });

    if (this.data.contactData) {
      this.helperService.patchFormValues(this.contactForm, this.data.contactData);
    }
  }
  public submitClick(): void {
    let result: ManageContactDialogResultInterface = {
      result: DialogActionsEnum.Confirm,
      contactData: this.contactForm.value
    }
    this.dialogRef.close(result);
  }

  public cancelClick(): void {
    let result: ManageContactDialogResultInterface = {
      result: DialogActionsEnum.Cancel,
      contactData: this.contactForm.value
    }
    this.dialogRef.close(result);
  }

  public deleteClick(): void {
    let result: ManageContactDialogResultInterface = {
      result: DialogActionsEnum.Delete,
      contactData: this.contactForm.value
    }
    this.dialogRef.close(result);
  }

  public get todayMaxDate(): Date {
    return new Date();
  }

}
