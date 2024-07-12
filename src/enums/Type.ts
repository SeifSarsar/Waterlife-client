import Translator from '../shared/translations/Translator';
import { Category } from './Category';

export type Type = HomeType | BoatType | SmallBoatType | NoneType;

export enum NoneType {
  None = 'None',
}

export enum HomeType {
  FloatingHouse = 'FloatingHouse',
  RiversideHouse = 'RiversideHouse',
  SleepAboard = 'SleepAboard',
}

export enum BoatType {
  SailingBoat = 'SailingBoat',
  FishingBoat = 'FishingBoat',
  PleasureBoat = 'PleasureBoat',
}

export enum SmallBoatType {
  Kayak = 'Kayak',
  RowBoat = 'RowBoat',
  Canoe = 'Canoe',
  Pedalo = 'Pedalo',
  PaddleBoard= 'PaddleBoard',
  Wakesurf = 'Wakesurf',
  JetSki = 'JetSki',
  Wakeboard = 'Wakeboard',
  WaterSki = 'WaterSki',
}

export function TypeToString(category: Category | undefined, type: Type | undefined) {
  switch (category) {
    case Category.Home:
      return HomeTypeToString(type as HomeType);
    case Category.Boat:
      return BoatTypeToString(type as BoatType);
    case Category.SmallBoat:
      return SmallBoatTypeToString(type as SmallBoatType);
    case Category.Waterfront:
      return Translator.getProductsText().category.waterside;
  }
  return '';
}

export function HomeTypeToString(type: HomeType) {
  const text = Translator.getProductsText();
  const typeText = text.type;

  switch (type) {
    case HomeType.FloatingHouse:
      return typeText.floatinghouse;
    case HomeType.RiversideHouse:
      return typeText.riversidehouse;
    case HomeType.SleepAboard:
      return typeText.sleepaboard;
  }
}

export function BoatTypeToString(type: BoatType) {
  const text = Translator.getProductsText();
  const typeText = text.type;

  switch (type) {
    case BoatType.SailingBoat:
      return typeText.sailingboat;
    case BoatType.FishingBoat:
      return typeText.fishingboat;
    case BoatType.PleasureBoat:
      return typeText.pleasureboat;
  }
}

export function SmallBoatTypeToString(type: SmallBoatType) {
  const text = Translator.getProductsText();
  const typeText = text.type;

  switch (type) {
    case SmallBoatType.Kayak:
      return typeText.kayak;
    case SmallBoatType.Pedalo:
      return typeText.pedalo;
    case SmallBoatType.Canoe:
      return typeText.canoe;
    case SmallBoatType.RowBoat:
      return typeText.rowboat;
    case SmallBoatType.PaddleBoard:
      return typeText.paddleboard;
    case SmallBoatType.JetSki:
      return typeText.jetski;
    case SmallBoatType.WaterSki:
      return typeText.waterski;
    case SmallBoatType.Wakeboard:
      return typeText.wakeboard;
    case SmallBoatType.Wakesurf:
      return typeText.wakesurf;
  }
}
