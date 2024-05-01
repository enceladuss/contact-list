import { Component } from '@angular/core';
import {ContactCardComponent} from "../contacts-list/components/contact-card/contact-card.component";
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {MatButton} from "@angular/material/button";
import {SearchInputComponent} from "../../../shared/components/search-input/search-input.component";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        ContactCardComponent,
        HeaderComponent,
        MatButton,
        SearchInputComponent
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
