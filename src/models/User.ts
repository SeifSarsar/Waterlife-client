import { AccountType } from '../enums/AccountType';

export class User {
  _id = '';
  stripeId = '';
  stripeBankId = '';
  email = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  accountType: AccountType = AccountType.disconnect;
}
