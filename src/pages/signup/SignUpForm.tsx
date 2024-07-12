import Translator from "../../shared/translations/Translator";
import { AccountType } from "../../enums/AccountType";
import { ErrorText, ErrorTextReturn, Text, Select } from "./SignUp.style";
import { Input } from "../../shared/inputs/Inputs.style";

interface Props {
  handleForm: any;
  outFocusLastName: any;
  outFocusFistName: any;
  outFocusPhone: any;
  outFocusPassword: any;
  outFocusVerifyPassword: any;
  handleAccountType: any;
  accountType: AccountType;

  accountConnected: AccountType;

  showErrorLastName: boolean;
  showErrorLastNameLenght: boolean;
  showErrorFirstName: boolean;
  showErrorFirstNameLenght: boolean;
  showErrorEmail: boolean;
  showErrorPhone: boolean;
  showErrorPhoneLenght: boolean;
  showErrorPasswordMissing: boolean;
  showErrorPasswordLenghtMin: boolean;
  showErrorPasswordLenghtMax: boolean;
  showErrorVerifyPassword: boolean;
  showErrorVerifyPasswordMatch: boolean;
  errorText: string;
}

const EmbededSignUp = (props: Props) => {
  const text = Translator.getSignupText();
  const {
    handleForm,
    handleAccountType,
    accountConnected,
    outFocusLastName,
    outFocusFistName,
    outFocusPhone,
    outFocusPassword,
    outFocusVerifyPassword,
    showErrorLastName,
    showErrorLastNameLenght,
    showErrorFirstName,
    showErrorFirstNameLenght,
    showErrorEmail,
    showErrorPhone,
    showErrorPhoneLenght,
    showErrorPasswordMissing,
    showErrorPasswordLenghtMin,
    showErrorPasswordLenghtMax,
    showErrorVerifyPassword,
    showErrorVerifyPasswordMatch,
    errorText,
    accountType,
  } = props;

  const specialPermission = accountConnected === AccountType.admin || accountConnected === AccountType.manager

  return (
    <>
      {specialPermission && (
        <Text> {text.adminpassword} </Text>
      )}
      {specialPermission && (
        <Input
          width="80%"
          type="password"
          name="adminPassword"
          onChange={handleForm}
        />
      )}

      <Text> {text.familyname} </Text>
      <Input
        width="80%"
        type="text"
        name="lastname"
        onChange={handleForm}
        onBlur={outFocusLastName}
      />
      {showErrorLastName && <ErrorText> {text.require} </ErrorText>}
      {showErrorLastNameLenght && <ErrorText> {text.namelenght} </ErrorText>}

      <Text> {text.name} </Text>
      <Input
        width="80%"
        type="text"
        name="firstname"
        onChange={handleForm}
        onBlur={outFocusFistName}
      />
      {showErrorFirstName && <ErrorText> {text.require} </ErrorText>}
      {showErrorFirstNameLenght && <ErrorText> {text.namelenght} </ErrorText>}

      <Text> {text.email} </Text>
      <Input width="80%" type="text" name="email" onChange={handleForm} />
      {showErrorEmail && <ErrorText> {text.require} </ErrorText>}

      <Text> {text.phone} </Text>
      <Input
        width="80%"
        type="text"
        name="phone"
        onChange={handleForm}
        onBlur={outFocusPhone}
      />
      {showErrorPhone && <ErrorText> {text.require} </ErrorText>}
      {showErrorPhoneLenght && <ErrorText> {text.phonelenght} </ErrorText>}

      <Text> {text.password} </Text>
      <Input
        width="80%"
        type="password"
        name="password"
        onChange={handleForm}
        onBlur={outFocusPassword}
      />
      {showErrorPasswordMissing && <ErrorText> {text.require} </ErrorText>}
      {showErrorPasswordLenghtMin && <ErrorText> {text.minchar} </ErrorText>}
      {showErrorPasswordLenghtMax && <ErrorText> {text.maxchar} </ErrorText>}

      <Text> {text.confirm} </Text>
      <Input
        width="80%"
        type="password"
        name="verifyPassword"
        onChange={handleForm}
        onBlur={outFocusVerifyPassword}
      />
      {showErrorVerifyPassword && <ErrorText> {text.require} </ErrorText>}
      {showErrorVerifyPasswordMatch && <ErrorText> {text.wrongpwd} </ErrorText>}
      {specialPermission && (
        <>
          <Text> {text.accounttype} </Text>
          <Select value={accountType} onChange={handleAccountType}>
            <option value={AccountType.user}>{text.accountUser}</option>
            <option value={AccountType.employee}>{text.accountEmployee}</option>
            <option value={AccountType.manager}>{text.accountManager}</option>
            {accountConnected === AccountType.admin && (
              <option value={AccountType.admin}>{text.accountAdmin}</option>
            )} 
          </Select>
        </>
      )}
      <ErrorTextReturn>{errorText}</ErrorTextReturn>
    </>
  );
};

export default EmbededSignUp;
