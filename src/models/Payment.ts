import { DayBooking } from './DayBooking';
import { OvernightBooking } from './OvernightBooking';

export interface Payments {
  _id: string;
  userId: string;
  productId: string;
  initialPrice: number;
  govTaxes: number;
  provTaxes: number;
  lodgingTaxes: number;
  taxes: number;
  charges: number;
  paymentId: String;
  state: String;
  from: Date;
  to: Date;
  safeDepositPaymentId: string;
  safeDepositAmount: number;
  isSafeDepositAccepted: boolean;
  isCanceled: Boolean;
  overnightBooking: OvernightBooking | null;
  dayBooking: DayBooking | null;
}
