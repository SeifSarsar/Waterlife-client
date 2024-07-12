import { Component } from 'react';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import Translator from '../../shared/translations/Translator';
import {
  Text,
  TextLink,
  Title,
  ErrorText,
  ErrorTextReturn,
  FlexInput,
  Label,
} from './Account.style';
import { AccountType } from '../../enums/AccountType';
import { AuthContext } from '../../contexts/AuthContext';
import AxiosHandler from '../../shared/AxiosHandler';
import { Input } from '../../shared/inputs/Inputs.style';
import { Page } from './Account';
import { User } from '../../models/User';
import ModalDialog from '../../shared/modal/Modal';

const lenghtNameMin = 2;
const lenghtNameMax = 20;
const lenghtPhoneMin = 10;

interface Props {
  changePage(page: Page): void;
}

interface State {
  _id: string;
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  accountType: AccountType;
  missingLastName: boolean;
  missingFirstName: boolean;
  missingPhone: boolean;
  lenghtlNameInvalid: boolean;
  lenghtfNameInvalid: boolean;
  lenghtPhoneInvalid: boolean;
  errorServer: string;
  showModal: boolean;
}

class PersonalInfo extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      _id: '',
      email: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      accountType: AccountType.disconnect,
      missingLastName: false,
      missingFirstName: false,
      missingPhone: false,
      lenghtlNameInvalid: false,
      lenghtfNameInvalid: false,
      lenghtPhoneInvalid: false,
      errorServer: '',
      showModal: false,
    };
  }

  setInfo = (event: any) => {
    if (event.target.name === 'lastName') {
      this.setState({ lastName: event.target.value });
    }
    if (event.target.name === 'firstName') {
      this.setState({ firstName: event.target.value });
    }
    if (event.target.name === 'phoneNumber') {
      this.setState({ phoneNumber: event.target.value });
    }
  };

  componentDidMount() {
    if (this.context.user) {
      this.setState({
        _id: this.context.user._id,
        email: this.context.user.email,
        firstName: this.context.user.firstName,
        lastName: this.context.user.lastName,
        phoneNumber: this.context.user.phoneNumber
          ? this.context.user.phoneNumber
          : '',
        accountType: this.context.user.accountType,
      });
    }
  }

  componentDidUpdate() {
    if (this.state._id === '' && this.context.user) {
      this.setState({
        _id: this.context.user._id,
        email: this.context.user.email,
        firstName: this.context.user.firstName,
        lastName: this.context.user.lastName,
        phoneNumber: this.context.user.phoneNumber
          ? this.context.user.phoneNumber
          : '',
        accountType: this.context.user.accountType,
      });
    }
  }

  changeName = () => {
    if (this.verifyInformation()) {
      AxiosHandler.put(`/update/user/${this.context.user!._id}`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
      })
        .then(() => {
          this.setState({ showModal: true });
          this.context.setUser({
            ...(this.context.user as User),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
          });
        })
        .catch((error) => {});
    }
  };

  verifyInformation = (): Boolean => {
    let valid: Boolean = true;
    if (this.state.lastName === '') {
      valid = false;
      this.setState({ missingLastName: true });
    } else {
      this.setState({ missingLastName: false });
    }
    if (
      this.state.lastName.length < lenghtNameMin ||
      this.state.lastName.length > lenghtNameMax
    ) {
      valid = false;
      this.setState({ lenghtlNameInvalid: true });
    } else {
      this.setState({ lenghtlNameInvalid: false });
    }
    if (this.state.firstName === '') {
      valid = false;
      this.setState({ missingFirstName: true });
    } else {
      this.setState({ missingFirstName: false });
    }
    if (
      this.state.firstName.length < lenghtNameMin ||
      this.state.firstName.length > lenghtNameMax
    ) {
      valid = false;
      this.setState({ lenghtfNameInvalid: true });
    } else {
      this.setState({ lenghtfNameInvalid: false });
    }
    if (this.state.phoneNumber === '') {
      valid = false;
      this.setState({ missingPhone: true });
    } else {
      this.setState({ missingPhone: false });
    }
    if (
      this.state.phoneNumber.length < lenghtPhoneMin ||
      this.state.phoneNumber.length > lenghtNameMax
    ) {
      valid = false;
      this.setState({ lenghtPhoneInvalid: true });
    } else {
      this.setState({ lenghtPhoneInvalid: false });
    }
    return valid;
  };

  render() {
    const {
      email,
      lastName,
      firstName,
      phoneNumber,
      accountType,
      missingLastName,
      lenghtlNameInvalid,
      missingFirstName,
      lenghtfNameInvalid,
      missingPhone,
      lenghtPhoneInvalid,
      errorServer,
      showModal,
    } = this.state;
    const text = Translator.getAccountText();

    return (
      <>
        <Title>{text.personalinfo}</Title>

        <FlexInput>
          <Label>{text.familyname}: </Label>
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.setInfo}
          ></Input>
        </FlexInput>
        <ErrorText>
          {missingLastName && <ErrorText>{text.require}</ErrorText>}
          {lenghtlNameInvalid && <ErrorText>{text.char}</ErrorText>}
        </ErrorText>

        <FlexInput>
          <Label>{text.name}: </Label>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.setInfo}
          ></Input>
        </FlexInput>
        <ErrorText>
          {missingFirstName && <ErrorText>{text.require}</ErrorText>}
          {lenghtfNameInvalid && <ErrorText>{text.char}</ErrorText>}
        </ErrorText>

        <FlexInput>
          <Label>{text.phone}: </Label>
          <Input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.setInfo}
          ></Input>
        </FlexInput>
        <ErrorText>
          {missingPhone && <ErrorText>{text.require}</ErrorText>}
          {lenghtPhoneInvalid && <ErrorText>{text.charphone}</ErrorText>}
        </ErrorText>
        <ErrorTextReturn>{errorServer}</ErrorTextReturn>

        <FlexInput>
          <Label>{text.password}: </Label>
          <Text>*********</Text>
          <TextLink onClick={() => this.props.changePage(Page.Password)}>
            {text.changepassword}
          </TextLink>
        </FlexInput>

        <FlexInput>
          <Label>{text.email}: </Label>
          <Text>{email}</Text>
          <TextLink onClick={() => this.props.changePage(Page.Email)}>
            {text.changeemail}
          </TextLink>
        </FlexInput>
        {accountType !== AccountType.user && (
          <FlexInput>
            <Label>{text.account}: </Label>
            {accountType === AccountType.admin && <Text> {text.admin}</Text>}
            {accountType === AccountType.manager && <Text>{text.manager}</Text>}
            {accountType === AccountType.employee && (
              <Text>{text.employee}</Text>
            )}
          </FlexInput>
        )}
        {this.context.user?.stripeBankId !== '' && (
          <FlexInput>
            <Label>{text.BankAccount}</Label>
            <TextLink onClick={() => this.props.changePage(Page.Bank)}>
              {text.changeBankAccount}
            </TextLink>
          </FlexInput>
        )}

        <PrimaryButton onClick={this.changeName} width="100%">
          {text.save}
        </PrimaryButton>

        <ModalDialog
          handleClose={() => {
            this.setState({ showModal: false });
          }}
          onConfirm={() => {
            this.setState({ showModal: false });
          }}
          show={showModal}
          title={Translator.getConfirmationsText().infoconfirm}
          secondaryBtn={false}
          primaryBtnText={'Ok'}
        />
      </>
    );
  }
}
export default PersonalInfo;
