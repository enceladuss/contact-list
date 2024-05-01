import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedHelperService {

  constructor() { }

  public patchFormValues(form: FormGroup, data: any, emitEvent = true): void {
    Object.keys(form.controls).forEach(controlName => {
      if (data.hasOwnProperty(controlName) && data[controlName] !== null) {
        form.get(controlName)?.patchValue(data[controlName],  { emitEvent });
      }
    });
  }
}
