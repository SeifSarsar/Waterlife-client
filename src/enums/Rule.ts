import Translator from "../shared/translations/Translator";

export enum Rule {
  Pet = 'Pet',
  Smoking = 'Smoking',
  Party = 'Party',
}

export function RuleToString(rule: Rule) {
  const text = Translator.getProductsText().rules;
  switch (rule) {
    case Rule.Pet:
      return text.pets;
    case Rule.Smoking:
      return text.smoking;;
    case Rule.Party:
      return text.party;
    default:
      return '';
  }
}
