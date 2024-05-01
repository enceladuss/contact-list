import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ContactInterface } from '../interfaces/contact.interface';
import { DummyContacts } from '../../../core/misc/dummyContacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contacts: ContactInterface[] = [];
  private contactsSubject: BehaviorSubject<ContactInterface[]> = new BehaviorSubject<ContactInterface[]>([]);

  constructor() {
    this.loadContactsFromLocalStorage();
  }

  public addContact(contact: ContactInterface): void {
    const newContact: ContactInterface = { ...contact, id: uuidv4() };
    this.contacts.push(newContact);
    this.updateContacts();
  }

  public editContact(updatedContact: ContactInterface): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...this.contacts[index], ...updatedContact };
      this.updateContacts();
    }
  }

  public deleteContact(id: string): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
    this.updateContacts();
  }

  public getContact(id: string): Observable<ContactInterface | undefined> {
    return this.contactsSubject.pipe(
      map(contacts => contacts.find(contact => contact.id === id))
    );
  }

  public getContacts(): Observable<ContactInterface[]> {
    return this.contactsSubject.asObservable();
  }

  public searchContacts(query: string): Observable<ContactInterface[]> {
    const trimmedQuery = query.toLowerCase().trim();
    return this.contactsSubject.pipe(
      map(contacts =>
        contacts.filter(contact =>
          contact.fullName.toLowerCase().includes(trimmedQuery) ||
          contact.phoneNumber.includes(trimmedQuery) ||
          contact.emailAddress.toLowerCase().includes(trimmedQuery)
        )
      )
    );
  }

  private updateContacts(): void {
    this.contactsSubject.next([...this.contacts]);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  private loadContactsFromLocalStorage(): void {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
      this.updateContacts();
    }
  }

  public createDummyContacts(): void {
    if (!this.contacts || !this.contacts.length) {
      const dummyContacts: ContactInterface[] = DummyContacts;

      dummyContacts.forEach(contact => this.addContact(contact));
    }
  }
}
