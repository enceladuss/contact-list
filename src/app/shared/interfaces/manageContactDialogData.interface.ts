import {ContactInterface} from "../../modules/contacts/interfaces/contact.interface";

export interface ManageContactDialogDataInterface {
  heading: string,
  contactData?: ContactInterface | null;
}
