import Translator from '../shared/translations/Translator';

export enum Bed {
  Single = '0',
  Double = '1',
  Queen = '2',
  King = '3',
}

export function BedToString(bed: Bed) {
  const text = Translator.getProductsText();
  const bedText = text.bed;

  switch (bed) {
    case Bed.Single:
      return bedText.single;
    case Bed.Double:
      return bedText.double;
    case Bed.Queen:
      return bedText.queen;
    case Bed.King:
      return bedText.king;
  }
}
