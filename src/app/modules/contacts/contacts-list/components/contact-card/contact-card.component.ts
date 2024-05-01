import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactInterface } from '../../../interfaces/contact.interface';

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

  @Input() contact!: ContactInterface;

}
