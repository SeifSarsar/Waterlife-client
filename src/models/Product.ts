import { OvernightBooking } from './OvernightBooking';
import { DayBooking } from './DayBooking';
import { Amenity } from '../enums/Amenity';
import { Category } from '../enums/Category';
import { Bed } from '../enums/Bed';
import Location from './Location';
import { Type, NoneType } from '../enums/Type';
import { Captain } from '../enums/Captain';
import Address from './Address';
import { Rule } from '../enums/Rule';
import { Review } from './Review';

export class Product {
  _id: string = '';
  hostStripeId: string = '';
  userId: string = '';
  title: string = '';
  images: string[] = [];
  thumbnail: number = 0;
  category: Category = Category.None;
  type: Type = NoneType.None;
  price: number = 5; //Price per night or h for boats
  safeDepositAmount: number = 0;
  address: Address = new Address();
  location: Location = {
    type: 'Point',
    coordinates: [],
  };
  description: string = '';
  amenities: Set<Amenity> = new Set();
  dayBooking: Array<DayBooking> = [];
  overnightBooking: Array<OvernightBooking> = [];
  rules: Set<Rule> = new Set();
  nGuests: number = 1;
  nBedrooms: number = 0;
  nWashrooms: number = 0;
  bedrooms: Bed[][] = [];
  reviews: Review[] = [];
  rating: number = 0;
  unavailableDays: Array<Date> = [];
  checkinStart: number = -1;
  checkinEnd: number = -1;
  checkout: number = -1;
  availableStart: number = -1;
  availableEnd: number = -1;
  isElectricMotor: boolean = false;
  captain: Captain = Captain.None;
}

export function FormatProductForDBCreate(product: Product) {
  const { _id, ...formatedProduct } = {
    ...product,
    amenities: Array.from(product.amenities),
    rules: Array.from(product.rules),
    images: [],
  };
  return formatedProduct;
}

export function FormatProductForDBUpdate(product: Product) {
  const { _id, ...formatedProduct } = {
    ...product,
    amenities: Array.from(product.amenities),
    rules: Array.from(product.rules),
  };
  return formatedProduct;
}
