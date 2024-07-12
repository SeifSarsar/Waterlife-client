import { Province } from '../enums/Province';

export function GetFedTax(province: string) {
  switch (province) {
    case Province.NL:
    case Province.PE:
    case Province.NS:
    case Province.NB:
      return 0.15;
    case Province.ON:
      return 0.13;
    default:
      return 0.05;
  }
}
export function GetProvTax(province: string) {
  switch (province) {
    case Province.QC:
      return 0.09975;
    case Province.BC:
      return 0.07;
    case Province.MB:
      return 0.07;
    case Province.SK:
      return 0.06;
    default:
      return 0;
  }
}

export function GetLodgingTax(province: Province, days: number, city?: string) {
  switch (province) {
    case Province.QC:
      return days <= 31 ? 0.035 : 0;
    case Province.BC:
      return days <= 26 ? 0.2 : 0;
    case Province.AB:
      return days <= 27 ? 0.04 : 0;
    default:
      return 0;
  }
}
