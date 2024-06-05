import { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import SignInForm from './SignInForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ConnectionBox, Container, LinkText, Logo } from './SignIn.style';
import { auth } from '../../FireBaseApp';
import { Routes } from '../../enums/Routes';
import Translator from '../../shared/translations/Translator';
import { PrimaryButton, SecondaryButton } from '../../shared/buttons/Buttons.style';

const NavigationLinkStyle = {
  textDecoration: 'none',
};

interface Props extends RouteComponentProps {
  embededPage?: boolean;
  onConnected?: any;
}

class SignIn extends Component<Props> {
  state = {
    email: '',
    password: '',
    errorText: '',
    showErrorEmail: false,
    showErrorPasswordMissing: false,
  };

  firebaseConnection = () => {
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((value) => {
        // Signed in

        if (!this.props.embededPage) {
          this.props.history.push({
            pathname: Routes.Home,
          });
        } else {
          this.props.onConnected(true);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const text = Translator.getFirebaseError();
        if(errorCode === "auth/email-already-exists"){
          this.setState({ errorText: text.emailalreadyexists });

        } else if(errorCode === "auth/invalid-email"){
          this.setState({ errorText: text.invalidemail });

        } else if(errorCode === "auth/user-not-found"){
          this.setState({ errorText: text.usernotfound });

        } else if(errorCode === "auth/wrong-password"){
          this.setState({ errorText: text.wrongpassword });

        } else{
          this.setState({ errorText: text.servererror });
        }
      });
  };

  handleForm = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  connection = () => {
    if (this.verifyInformation()) {
      this.firebaseConnection();
    }
  };

  verifyInformation = (): Boolean => {
    let valid: Boolean = true;
    if (this.state.email === '') {
      valid = false;
      this.setState({ showErrorEmail: true });
    } else {
      this.setState({ showErrorEmail: false });
    }
    if (this.state.password === '') {
      valid = false;
      this.setState({ showErrorPasswordMissing: true });
    } else {
      this.setState({ showErrorPasswordMissing: false });
    }
    return valid;
  };

  render() {
    const text = Translator.getSigninText();
    const embededPage = this.props.embededPage;
    const { showErrorEmail, showErrorPasswordMissing, errorText } = this.state;

    return (
      <Container>
        {!embededPage && (
          <ConnectionBox>
            <Logo src={Translator.getLogo()} />

            <SignInForm
              handleForm={this.handleForm}
              showErrorEmail={showErrorEmail}
              showErrorPasswordMissing={showErrorPasswordMissing}
              errorText={errorText}
            />

            <PrimaryButton width="50%" onClick={this.connection}>
              {text.connection}
            </PrimaryButton>

            <Link to={Routes.SignUp} style={NavigationLinkStyle}>
              <LinkText> {text.newaccount} </LinkText>
            </Link>
          </ConnectionBox>
        )}

        {embededPage && (
          <div>
            <SignInForm
              handleForm={this.handleForm}
              showErrorEmail={showErrorEmail}
              showErrorPasswordMissing={showErrorPasswordMissing}
              errorText={errorText}
            />
            <SecondaryButton width="50%" onClick={this.connection}>
              {text.connection}
            </SecondaryButton>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(SignIn);
