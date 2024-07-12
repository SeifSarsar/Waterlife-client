import { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Container,
  ConnectionBox,
  Text,
  Logo,
  LinkText,
  ErrorTextReturn,
} from '../signin/SignIn.style';
import Translator from '../../shared/translations/Translator';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import { auth } from '../../FireBaseApp';
import { Routes } from '../../enums/Routes';
import { Input } from '../../shared/inputs/Inputs.style';
import { Hr } from '../../layout/navbar/Account.style';
import ModalDialog from '../../shared/modal/Modal'

const NavigationLinkStyle = {
  textDecoration: 'none',
};

interface Props extends RouteComponentProps {}

class ForgotPassword extends Component<Props> {
  state = {
    email: '',
    showErrorEmail: false,
    showModal: false,
  };

  handleForm = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetPassword = async () => {
    if (this.state.email === '') {
      this.setState({ showErrorEmail: true });
    } else {
      this.setState({ showErrorEmail: false });
      const text = Translator.getForgotPasswordText();
      // Sign up code here.
      await sendPasswordResetEmail(auth, this.state.email)
        .then(() => {
          // Password reset email sent!
          this.setState({ showModal: true });
          this.props.history.push({
            pathname: Routes.SignIn
          });
        })
        .catch((error) => {
          alert(text.error);
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    }
  };

  render() {
    const text = Translator.getForgotPasswordText();

    return (
      <Container>
        <ConnectionBox>
          <Logo src={Translator.getLogo()} />
          <Text> {text.email} </Text>
          <Input 
            width="80%" 
            type="text" 
            name="email" 
            onChange={this.handleForm} 
          />
          {this.state.showErrorEmail && 
            <ErrorTextReturn> {text.require} </ErrorTextReturn>
          }
          <Hr />
          
          <PrimaryButton width="50%" onClick={this.resetPassword}>
              {text.reset}
            </PrimaryButton>

          <Link to={Routes.SignIn} style={NavigationLinkStyle}>
            <LinkText> {text.connection} </LinkText>
          </Link>
        </ConnectionBox>

        <ModalDialog 
          handleClose={() => {this.setState({ showModal: false });}}
          onConfirm={() => {this.setState({ showModal: false });}}
          show={this.state.showModal}
          title={text.verifiedemail}
          secondaryBtn={false}
          primaryBtnText={"Ok"}
        /> 
      </Container>
    );
  }
}

export default withRouter(ForgotPassword);
