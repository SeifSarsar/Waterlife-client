import Translator from '../shared/translations/Translator';
import { Category } from './Category';

export type Amenity = HomeAmenity | BoatAmenity | WaterfrontAmenity;

export enum HomeAmenity {
  Wifi = '0',
  AirConditioning = '1',
  Furniture = '3',
  Stove = '4',
  BBQ = '5',
  MobilityFriendly = '6',
  Heater = '7',
  SolarPanel = '8',
  RescueKit = '9',
  Washer = '10',
  DrinkingWater = '11',
  FirePlace = '12',
  Wood = '13',
  FireCamp = '14',
}

export enum WaterfrontAmenity {
  Wifi = '0',
  FirePlace = '1',
  Wood = '2',
  FireCamp = '3',
  MobilityFriendly = '4',
  BBQ = '5',
  Heater = '6',
}

export enum BoatAmenity {
  Wifi = '0',
  AirConditioning = '1',
  DrinkingWater = '2',
  Furniture = '3',
  Stove = '4',
  BBQ = '5',
  MobilityFriendly = '6',
  Heater = '7',
  SolarPanel = '8',
  RescueKit = '9',
  Waterski = '10',
  Wakeboard = '11',
  Wakesurf = '12',
}

export function AmenityToString(category: Category, amenity: Amenity) {
  switch (category) {
    case Category.Home:
      return HomeAmenityToString(amenity as HomeAmenity);
    case Category.Boat:
      return BoatAmenityToString(amenity as BoatAmenity);
    case Category.SmallBoat:
      return WaterfrontAmenityToString(amenity as WaterfrontAmenity);
  }
  return '';
}
export function HomeAmenityToString(amenity: HomeAmenity) {
  const text = Translator.getProductsText().amenity;
  switch (amenity) {
    case HomeAmenity.AirConditioning:
      return text.airconditionning;
    case HomeAmenity.Furniture:
      return text.furniture;
    case HomeAmenity.Stove:
      return text.stove;
    case HomeAmenity.Wifi:
      return text.wifi;
    case HomeAmenity.MobilityFriendly:
      return text.mobility;
    case HomeAmenity.Heater:
      return text.heater;
    case HomeAmenity.SolarPanel:
      return text.solar;
    case HomeAmenity.RescueKit:
      return text.rescue;
    case HomeAmenity.BBQ:
      return text.bbq;
    case HomeAmenity.FireCamp:
      return text.firecamp;
    case HomeAmenity.Wood:
      return text.wood;
    case HomeAmenity.Washer:
      return text.washer;
    case HomeAmenity.DrinkingWater:
      return text.water;
    case HomeAmenity.FirePlace:
      return text.fireplace;
    default:
      return '';
  }
}

export function BoatAmenityToString(amenity: BoatAmenity) {
  const text = Translator.getProductsText().amenity;
  switch (amenity) {
    case BoatAmenity.AirConditioning:
      return text.airconditionning;
    case BoatAmenity.Furniture:
      return text.furniture;
    case BoatAmenity.Stove:
      return text.stove;
    case BoatAmenity.Wifi:
      return text.wifi;
    case BoatAmenity.MobilityFriendly:
      return text.mobility;
    case BoatAmenity.Heater:
      return text.heater;
    case BoatAmenity.SolarPanel:
      return text.solar;
    case BoatAmenity.RescueKit:
      return text.rescue;
    case BoatAmenity.BBQ:
      return text.bbq;
    case BoatAmenity.DrinkingWater:
      return text.water;
    case BoatAmenity.Waterski:
      return text.waterski;
    case BoatAmenity.Wakeboard:
      return 'Wakeboard';
    case BoatAmenity.Wakesurf:
      return 'Wakesurf';
    default:
      return '';
  }
}

export function WaterfrontAmenityToString(amenity: WaterfrontAmenity) {
  const text = Translator.getProductsText().amenity;
  switch (amenity) {
    case WaterfrontAmenity.Wifi:
      return text.wifi;
    case WaterfrontAmenity.MobilityFriendly:
      return text.mobility;
    case WaterfrontAmenity.Heater:
      return text.heater;
    case WaterfrontAmenity.BBQ:
      return text.bbq;
    case WaterfrontAmenity.FireCamp:
      return text.firecamp;
    case WaterfrontAmenity.Wood:
      return text.wood;
    case WaterfrontAmenity.FirePlace:
      return text.fireplace;
    default:
      return '';
  }
}
