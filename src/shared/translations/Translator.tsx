import { Languages } from "../../enums/Language";
import en from "./en.json";
import fr from "./fr.json";
import Cookies from "universal-cookie";

const getLanguage = () => {
  const cookies = new Cookies();
  return cookies.get("lang") === Languages.French
    ? Languages.French
    : Languages.English;
};

const getFile = () => {
  const cookies = new Cookies();
  return cookies.get("lang") === Languages.French ? fr : en;
};

export default class Translator {
  private static Language = getLanguage();
  private static File = getFile();

  static setLanguage(value: Languages) {
    getLanguage();
    Translator.Language = value;
    Translator.File = Translator.Language === Languages.English ? en : fr;
  }

  static getAccountText() {
    return Translator.File.account;
  }

  static getConfirmationsText() {
    return Translator.File.confirmations;
  }

  static getCreateProductText() {
    return Translator.File.createproduct;
  }

  static getConnectionRequireText() {
    return Translator.File.connectionrequire;
  }

  static getEditProductText() {
    return Translator.File.editProduct;
  }

  static getFooterText() {
    return Translator.File.footer;
  }

  static getForgotPasswordText() {
    return Translator.File.forgotpassword;
  }

  static getHomePagetext() {
    return Translator.File.home;
  }

  static getLogo() {
    return Translator.Language === Languages.English
      ? "/en-logo.png"
      : "/fr-logo.png";
  }

  static getNavbarText() {
    return Translator.File.navbar;
  }

  static getProductsText() {
    return Translator.File.products;
  }

  static getDescriptionText() {
    return Translator.File.productdescription;
  }

  static getPaymentText() {
    return Translator.File.payment;
  }

  static getSigninText() {
    return Translator.File.signin;
  }

  static getSignupText() {
    return Translator.File.signup;
  }

  static getSuccessText() {
    return Translator.File.success;
  }

  static getPropertyListText() {
    return Translator.File.propertylist;
  }
  static getHistoricText() {
    return Translator.File.historic;
  }

  static getContract() {
    return Translator.File.contract;
  }

  static getBecomeHostText() {
    return Translator.File.becomeHost;
  }

  static getRefund() {
    return Translator.File.refund;
  }

  static getSuccessRefund() {
    return Translator.File.successRefund;
  }

  static getAboutText() {
    return Translator.File.About;
  }

  static getBookingText() {
    return Translator.File.booking;
  }

  static getNoResult() {
    return Translator.File.noresult;
  }

  static getOwnerRefund() {
    return Translator.File.OwnerRefund;
  }

  static getNotFoundPage() {
    return Translator.File.notfoundpage;
  }

  static getFirebaseError() {
    return Translator.File.firebase;
  }
}
