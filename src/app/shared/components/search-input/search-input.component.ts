import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,]
})
export class SearchInputComponent implements OnInit {

  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  public search: FormControl = new FormControl('');

  public ngOnInit() {
    this.search.valueChanges.pipe(
      map((search) => search.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((query) => {
      this.searchQuery.emit(query);
    });
  }
}
