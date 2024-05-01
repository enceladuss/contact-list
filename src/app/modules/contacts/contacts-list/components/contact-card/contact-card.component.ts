import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

}
