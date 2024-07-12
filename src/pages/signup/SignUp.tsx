import { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  ConnectionAccountText,
  ConnectionBox,
  Container,
  Logo,
} from './SignUp.style';
import ModalDialog from '../../shared/modal/Modal';
import { AccountType } from '../../enums/AccountType';

import Translator from '../../shared/translations/Translator';
import { auth } from '../../FireBaseApp';
import { AuthContext } from '../../contexts/AuthContext';
import { Routes } from '../../enums/Routes';
import SignUpForm from './SignUpForm';
import { LeftSecondaryButton } from '../payment/components/checkoutForm.style';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import AxiosHandler from '../../shared/AxiosHandler';

const NavigationLinkStyle = {
  textDecoration: 'none',
};

const lenghtNameMin = 2;
const lenghtNameMax = 20;
const lenghtPhoneMin = 10;
const lenghtPasswordMin = 8;
const lenghtPasswordMax = 30;

interface Props extends RouteComponentProps {
  embededPage?: boolean;
  onConnected?: any;
}

interface State {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  password: string;
  verifyPassword: string;
  accountType: AccountType;

  adminEmail: string;
  adminPassword: string;
  accountConnected: AccountType;

  errorText: string;
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
  showModal: boolean;
}

class SignUp extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      lastname: '',
      firstname: '',
      email: '',
      phone: '',
      password: '',
      verifyPassword: '',
      accountType: AccountType.user,

      adminEmail: '',
      adminPassword: '',
      accountConnected: AccountType.disconnect,

      errorText: '',
      showErrorLastName: false,
      showErrorLastNameLenght: false,
      showErrorFirstName: false,
      showErrorFirstNameLenght: false,
      showErrorEmail: false,
      showErrorPhone: false,
      showErrorPhoneLenght: false,
      showErrorPasswordMissing: false,
      showErrorPasswordLenghtMin: false,
      showErrorPasswordLenghtMax: false,
      showErrorVerifyPassword: false,
      showErrorVerifyPasswordMatch: false,
      showModal: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) return;
    if (this.state.accountConnected === AccountType.disconnect) {
      this.setState({
        accountConnected: this.context.user.accountType,
      });
      if (this.context.user.accountType === AccountType.disconnect) {
        this.setState({
          accountConnected: AccountType.user,
        });
      }
    }
  }

  // Submit function (Create account)
  handleSubmit = async () => {
    let email = this.state.email.toLowerCase();
    if (auth.currentUser && auth.currentUser.email) {
      email = auth.currentUser.email;
    }

    const user = {
      email: this.state.email,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      phoneNumber: this.state.phone,
      accountType: this.state.accountType,
    };
    await AxiosHandler.post('/create/user', user).catch((error) => {});

    // Sign up code here.
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => {
        // Signed in
        this.sendEmail();
        this.setState({ showModal: true });
        if (this.isAdminOrManager()) {
          this.disconnect();
          if (email !== null) {
            this.firebaseConnection(email);
          }
        }

        if (!this.isAdminOrManager()) {
          if (!this.props.embededPage) {
            this.props.history.push({
              pathname: Routes.Home,
            });
          } else {
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const text = Translator.getFirebaseError();
        if (errorCode === 'auth/email-already-in-use') {
          this.setState({ errorText: text.emailalreadyexists });
        } else if (errorCode === 'auth/invalid-email') {
          this.setState({ errorText: text.invalidemail });
        } else if (errorCode === 'auth/user-not-found') {
          this.setState({ errorText: text.usernotfound });
        } else if (errorCode === 'auth/wrong-password') {
          this.setState({ errorText: text.wrongpassword });
        } else {
          this.setState({ errorText: text.servererror });
        }
      });
  };

  sendEmail = async () => {
    if (auth.currentUser !== null) {
      await sendEmailVerification(auth.currentUser)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const text = Translator.getFirebaseError();
          if (errorCode === 'auth/email-already-exists') {
            this.setState({ errorText: text.emailalreadyexists });
          } else if (errorCode === 'auth/invalid-email') {
            this.setState({ errorText: text.invalidemail });
          } else if (errorCode === 'auth/user-not-found') {
            this.setState({ errorText: text.usernotfound });
          } else if (errorCode === 'auth/wrong-password') {
            this.setState({ errorText: text.wrongpassword });
          } else {
            this.setState({ errorText: text.servererror });
          }
        });
    }
  };

  firebaseConnection = async (email: string) => {
    // Sign up code here.
    await signInWithEmailAndPassword(auth, email, this.state.adminPassword)
      .then(() => {
        // Signed in
      })
      .catch((error) => {
        const errorCode = error.code;
        const text = Translator.getFirebaseError();
        if (errorCode === 'auth/email-already-exists') {
          this.setState({ errorText: text.emailalreadyexists });
        } else if (errorCode === 'auth/invalid-email') {
          this.setState({ errorText: text.invalidemail });
        } else if (errorCode === 'auth/user-not-found') {
          this.setState({ errorText: text.usernotfound });
        } else if (errorCode === 'auth/wrong-password') {
          this.setState({ errorText: text.wrongpassword });
        } else {
          this.setState({ errorText: text.servererror });
        }
      });
  };

  disconnect = async () => {
    // Sign up code here.
    await signOut(auth);
  };

  handleForm = (event: any) => {
    if (event.target.name === 'lastname') {
      this.setState({ lastname: event.target.value });
    }
    if (event.target.name === 'firstname') {
      this.setState({ firstname: event.target.value });
    }
    if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name === 'phone') {
      this.setState({ phone: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name === 'verifyPassword') {
      this.setState({ verifyPassword: event.target.value });
    }
    if (event.target.name === 'adminPassword') {
      this.setState({ adminPassword: event.target.value });
    }
    let value: string = event.target.value;
    if (
      (event.target.name === 'lastname' && value.length < lenghtNameMin) ||
      value.length > lenghtNameMax
    ) {
      this.setState({ showErrorLastNameLenght: false });
    }
    if (
      (event.target.name === 'firstname' && value.length < lenghtNameMin) ||
      value.length > lenghtNameMax
    ) {
      this.setState({ showErrorFirstNameLenght: false });
    }
    if (
      (event.target.name === 'phone' && value.length < lenghtPhoneMin) ||
      value.length > lenghtNameMax
    ) {
      this.setState({ showErrorPhoneLenght: false });
    }
    if (
      (event.target.name === 'password' && value.length < lenghtPasswordMin) ||
      value.length > lenghtPasswordMax
    ) {
      this.setState({ showErrorPasswordLenghtMin: false });
    }
    if (
      event.target.name === 'verifyPassword' &&
      value === this.state.password
    ) {
      this.setState({ showErrorVerifyPasswordMatch: false });
    }
  };

  handleAccountType = (event: any) => {
    this.setState({ accountType: event.target.value });
  };

  outFocusLastName = () => {
    if (
      this.state.lastname.length < lenghtNameMin ||
      this.state.lastname.length > lenghtNameMax
    ) {
      this.setState({ showErrorLastNameLenght: true });
    }
  };

  outFocusFirstName = () => {
    if (
      this.state.firstname.length < lenghtNameMin ||
      this.state.firstname.length > lenghtNameMax
    ) {
      this.setState({ showErrorFirstNameLenght: true });
    }
  };

  outFocusPhone = () => {
    if (
      this.state.phone.length < lenghtPhoneMin ||
      this.state.phone.length > lenghtNameMax
    ) {
      this.setState({ showErrorPhoneLenght: true });
    }
  };

  outFocusPassword = () => {
    if (
      this.state.password.length < lenghtPasswordMin ||
      this.state.password.length > lenghtPasswordMax
    ) {
      this.setState({ showErrorPasswordLenghtMin: true });
    }
  };

  outFocusVerifyPassword = () => {
    if (this.state.password !== this.state.verifyPassword) {
      this.setState({ showErrorVerifyPasswordMatch: true });
    }
  };

  createAccount = () => {
    if (this.verifyInformation()) {
      this.handleSubmit();
    }
  };

  createAnotherAccount = async () => {
    if (this.state.adminPassword !== '') {
      if (auth.currentUser !== null) {
        var email = auth.currentUser.email;
        if (email !== null) {
          await signInWithEmailAndPassword(
            auth,
            email,
            this.state.adminPassword
          )
            .then((userCredential) => {
              if (this.verifyInformation()) {
                this.handleSubmit();
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const text = Translator.getFirebaseError();
              if (errorCode === 'auth/email-already-exists') {
                this.setState({ errorText: text.emailalreadyexists });
              } else if (errorCode === 'auth/invalid-email') {
                this.setState({ errorText: text.invalidemail });
              } else if (errorCode === 'auth/user-not-found') {
                this.setState({ errorText: text.usernotfound });
              } else if (errorCode === 'auth/wrong-password') {
                this.setState({ errorText: text.wrongpassword });
              } else {
                this.setState({ errorText: text.servererror });
              }
            });
        }
      }
    } else {
      this.setState({ errorText: 'Admin Password Required' });
    }
  };

  clear = () => {
    this.setState({
      adminPassword: '',
      email: '',
      phone: '',
      firstname: '',
      lastname: '',
      password: '',
      verifyPassword: '',
    });
  };

  verifyInformation = (): Boolean => {
    let valid: Boolean = true;
    if (this.state.lastname === '') {
      valid = false;
      this.setState({ showErrorLastName: true });
    } else {
      this.setState({ showErrorLastName: false });
    }
    if (this.state.firstname === '') {
      valid = false;
      this.setState({ showErrorFirstName: true });
    } else {
      this.setState({ showErrorFirstName: false });
    }
    if (this.state.email === '') {
      valid = false;
      this.setState({ showErrorEmail: true });
    } else {
      this.setState({ showErrorEmail: false });
    }
    if (this.state.phone === '') {
      valid = false;
      this.setState({ showErrorPhone: true });
    } else {
      this.setState({ showErrorPhone: false });
    }
    if (this.state.password === '') {
      valid = false;
      this.setState({ showErrorPasswordMissing: true });
    } else {
      this.setState({ showErrorPasswordMissing: false });
    }
    if (this.state.verifyPassword === '') {
      valid = false;
      this.setState({ showErrorVerifyPassword: true });
    } else {
      this.setState({ showErrorVerifyPassword: false });
    }
    if (
      this.state.lastname.length < lenghtNameMin ||
      this.state.lastname.length > lenghtNameMax
    ) {
      this.setState({ showErrorLastNameLenght: true });
    }
    if (
      this.state.firstname.length < lenghtNameMin ||
      this.state.firstname.length > lenghtNameMax
    ) {
      this.setState({ showErrorFirstNameLenght: true });
    }
    if (
      this.state.phone.length < lenghtPhoneMin ||
      this.state.phone.length > lenghtNameMax
    ) {
      this.setState({ showErrorPhoneLenght: true });
    }
    if (
      this.state.password.length < lenghtPasswordMin ||
      this.state.password.length > lenghtPasswordMax
    ) {
      this.setState({ showErrorPasswordLenghtMin: true });
    }
    if (this.state.password !== this.state.verifyPassword) {
      this.setState({ showErrorVerifyPasswordMatch: true });
    }
    if (
      this.state.showErrorPasswordLenghtMax ||
      this.state.showErrorPasswordLenghtMin ||
      this.state.showErrorVerifyPasswordMatch ||
      this.state.showErrorFirstNameLenght ||
      this.state.showErrorLastNameLenght ||
      this.state.showErrorPhoneLenght
    ) {
      valid = false;
    }
    return valid;
  };

  handleClose() {
    this.setState({
      showModal: false,
    });
  }

  isAdminOrManager() {
    return (
      this.state.accountConnected === AccountType.admin ||
      this.state.accountConnected === AccountType.manager
    );
  }

  render() {
    const text = Translator.getSignupText();
    const embededPage = this.props.embededPage;
    const {
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
      accountConnected,
      showModal,
    } = this.state;

    return (
      <Container>
        {!embededPage && (
          <ConnectionBox>
            <Logo src={Translator.getLogo()} />

            <SignUpForm
              handleForm={this.handleForm}
              outFocusLastName={this.outFocusLastName}
              outFocusFistName={this.outFocusFirstName}
              outFocusPhone={this.outFocusPhone}
              outFocusPassword={this.outFocusPassword}
              outFocusVerifyPassword={this.outFocusVerifyPassword}
              accountConnected={accountConnected}
              showErrorLastName={showErrorLastName}
              showErrorLastNameLenght={showErrorLastNameLenght}
              showErrorFirstName={showErrorFirstName}
              showErrorFirstNameLenght={showErrorFirstNameLenght}
              showErrorEmail={showErrorEmail}
              showErrorPhone={showErrorPhone}
              showErrorPhoneLenght={showErrorPhoneLenght}
              showErrorPasswordMissing={showErrorPasswordMissing}
              showErrorPasswordLenghtMin={showErrorPasswordLenghtMin}
              showErrorPasswordLenghtMax={showErrorPasswordLenghtMax}
              showErrorVerifyPassword={showErrorVerifyPassword}
              showErrorVerifyPasswordMatch={showErrorVerifyPasswordMatch}
              errorText={errorText}
              handleAccountType={this.handleAccountType}
              accountType={accountType}
            />

            {!this.isAdminOrManager() && (
              <PrimaryButton width="80%" onClick={this.createAccount}>
                {text.subscribe}
              </PrimaryButton>
            )}

            {this.isAdminOrManager() && (
              <PrimaryButton width="80%" onClick={this.createAnotherAccount}>
                {text.subscribe}
              </PrimaryButton>
            )}

            {!this.isAdminOrManager() && (
              <Link to={Routes.SignIn} style={NavigationLinkStyle}>
                <ConnectionAccountText>{text.connection}</ConnectionAccountText>
              </Link>
            )}
          </ConnectionBox>
        )}

        {embededPage && (
          <>
            <SignUpForm
              handleForm={this.handleForm}
              outFocusLastName={this.outFocusLastName}
              outFocusFistName={this.outFocusFirstName}
              outFocusPhone={this.outFocusPhone}
              outFocusPassword={this.outFocusPassword}
              outFocusVerifyPassword={this.outFocusVerifyPassword}
              accountConnected={accountConnected}
              showErrorLastName={showErrorLastName}
              showErrorLastNameLenght={showErrorLastNameLenght}
              showErrorFirstName={showErrorFirstName}
              showErrorFirstNameLenght={showErrorFirstNameLenght}
              showErrorEmail={showErrorEmail}
              showErrorPhone={showErrorPhone}
              showErrorPhoneLenght={showErrorPhoneLenght}
              showErrorPasswordMissing={showErrorPasswordMissing}
              showErrorPasswordLenghtMin={showErrorPasswordLenghtMin}
              showErrorPasswordLenghtMax={showErrorPasswordLenghtMax}
              showErrorVerifyPassword={showErrorVerifyPassword}
              showErrorVerifyPasswordMatch={showErrorVerifyPasswordMatch}
              errorText={errorText}
              handleAccountType={this.handleAccountType}
              accountType={accountType}
            />

            {accountConnected !== AccountType.admin && (
              <LeftSecondaryButton onClick={this.createAccount}>
                {text.subscribe}
              </LeftSecondaryButton>
            )}

            {accountConnected === AccountType.admin && (
              <LeftSecondaryButton onClick={this.createAnotherAccount}>
                {text.subscribe}
              </LeftSecondaryButton>
            )}
          </>
        )}

        <ModalDialog
          show={showModal}
          handleClose={this.handleClose}
          title={text.titleModal}
          text={text.signupsucess}
          secondaryBtn={false}
          primaryBtnText={text.close}
          onConfirm={this.handleClose}
        />
      </Container>
    );
  }
}

export default withRouter(SignUp);
