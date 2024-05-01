import { ContactInterface } from '../../modules/contacts/interfaces/contact.interface';
import { DialogActionsEnum } from '../enums/dialogActions.enum';

export interface ManageContactDialogResultInterface {
  result: DialogActionsEnum;
  contactData: ContactInterface;
}
