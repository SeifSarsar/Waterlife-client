
import { Product } from "./Product";

export interface GovDueList {
  state: String;
  amount: Number;
  dateLastReset: Date;
  resetOnce: boolean;
}
