import { Link } from 'react-router-dom';
import { Routes } from '../../enums/Routes';
import Translator from '../../shared/translations/Translator';
import { ErrorText, Text, ErrorTextReturn, LinkText } from './SignIn.style';
import { Input } from '../../shared/inputs/Inputs.style';

const NavigationLinkStyle = {
  textDecoration: 'none',
  paddingBottom: '15px',
};

interface Props {
  handleForm: any;
  showErrorEmail: boolean;
  showErrorPasswordMissing: boolean;
  errorText: string;
}

const SignInForm = (props: Props) => {
  const text = Translator.getSigninText();
  const { handleForm, showErrorEmail, showErrorPasswordMissing, errorText } =
    props;

  return (
    <>
      <Text> {text.email} </Text>
      <Input width="80%" type="text" name="email" onChange={handleForm} />
      {showErrorEmail && <ErrorText> {text.require} </ErrorText>}

      <Text> {text.password} </Text>
      <Input
        width="80%"
        type="password"
        name="password"
        onChange={handleForm}
      />
      {showErrorPasswordMissing && <ErrorText> {text.require} </ErrorText>}
      <ErrorTextReturn>{errorText}</ErrorTextReturn>
      <Link to={Routes.ForgotPassword} style={NavigationLinkStyle}>
        <LinkText> {text.forgotpwd} </LinkText>
      </Link>
    </>
  );
};

export default SignInForm;
