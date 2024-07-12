import { DayBooking } from './DayBooking';
import { OvernightBooking } from './OvernightBooking';
import { Product } from './Product';

export interface HistoricRentals {
  product: Product;
  overnightBooking: OvernightBooking | null;
  dayBooking: DayBooking | null;
  actual: Boolean;
  paymentId: String;
  phone: string;
  email: string;
  from: Date;
}
