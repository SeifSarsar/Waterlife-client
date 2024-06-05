import { Payments } from './Payment';
import { User } from './User';

export interface ListBooking {
  payment: Payments;
  user: User;
  isPassed: boolean;
}
