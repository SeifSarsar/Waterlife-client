import { Component } from 'react';

import { Container, Form, Title, Button, Error } from './BecomeHost.style';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AxiosHandler from '../../shared/AxiosHandler';
import PersonalInfoForm from './PersonalInfoForm';
import Address from '../../models/Address';
import BankAccountForm from './BankAccountForm';
import Contract from './Contract';
import Translator from '../../shared/translations/Translator';
import { User } from '../../models/User';
import { Routes } from '../../enums/Routes';

export class PersonalInfo {
  dateOfBirth = '';
  address = new Address();
}

export class BankAccount {
  bankName = '';
  institutionNumber = '';
  transitNumber = '';
  accountNumber = '';
}

interface Props extends RouteComponentProps {}

interface State {
  personalInfo: PersonalInfo;
  bankAccount: BankAccount;
  isProcessing: boolean;
  error: string;
  contractAccepted: boolean;
}

class BecomeHost extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  state: State = {
    personalInfo: new PersonalInfo(),
    bankAccount: new BankAccount(),
    isProcessing: false,
    error: '',
    contractAccepted: false,
  };

  componentDidMount() {
    if(this.context.user !== null && this.context.user.stripeId !== '') {
      this.props.history.push({
        pathname: Routes.CreateProduct,
      });
    }
  }

  isValidForm = () => {
    const { dateOfBirth, address } = this.state.personalInfo;

    const isPersonalInfoValid =
      dateOfBirth.length > 0 &&
      address.street.length > 0 &&
      address.city.length > 0 &&
      address.state.length > 0 &&
      address.postalCode.length > 0;

    if (!isPersonalInfoValid) return false;

    const { bankName, institutionNumber, transitNumber, accountNumber } =
      this.state.bankAccount;
    return (
      bankName.length > 0 &&
      institutionNumber.length === 3 &&
      transitNumber.length === 5 &&
      accountNumber.length > 0
    );
  };

  submit = () => {
    this.setState({
      error: '',
      isProcessing: true,
    });

    const { dateOfBirth, address } = this.state.personalInfo;

    const dob = dateOfBirth.split('-');

    const body = {
      id: this.context.user?._id,
      email: this.context.user?.email,
      firstName: this.context.user?.firstName,
      lastName: this.context.user?.lastName,
      legalName: `${this.context.user?.firstName} ${this.context.user?.lastName} `,
      day: dob[2],
      month: dob[1],
      year: dob[0],
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      ip: '0.0.0.0',
    };

    const { bankName, institutionNumber, transitNumber, accountNumber } =
      this.state.bankAccount;

    const paymentBody = {
      bankName,
      routingNumber: '0' + institutionNumber + transitNumber,
      accountNumber,
    };

    AxiosHandler.post('/create/connectedaccount', {
      ...body,
      ...paymentBody,
    })
      .then((res) => {
        const { stripeId, stripeBankId } = res.data;
        const user: User = {
          ...(this.context.user as User),
          stripeId,
          stripeBankId,
        };
        this.context.setUser(user);
        //Go to confirmation page maybe!
        this.props.history.push({
          pathname: Routes.CreateProduct,
        });
      })
      .catch((error) => {
        this.setState({ isProcessing: false });
        this.setState({
          error: error.response.data,
        });
      });
  };

  acceptContract() {
    this.setState({
      contractAccepted: true,
    });
  }

  render() {
    const { isProcessing, personalInfo, bankAccount, error, contractAccepted } =
      this.state;
    const text = Translator.getBecomeHostText();
    return (
      <Container>
        {!contractAccepted && (
          <Contract
            next={() => {
              this.acceptContract();
            }}
          />
        )}

        {contractAccepted && (
          <>
            <Title>{text.title}</Title>
            <Form>
              <PersonalInfoForm
                personalInfo={personalInfo}
                update={(personalInfo: PersonalInfo) => {
                  this.setState({ personalInfo });
                }}
              ></PersonalInfoForm>

              <BankAccountForm
                bankAccount={bankAccount}
                update={(bankAccount: BankAccount) => {
                  this.setState({ bankAccount });
                }}
              ></BankAccountForm>

              {error.length > 0 && <Error>{error}</Error>}
              <Button
                className={
                  !this.isValidForm() || isProcessing ? 'disabled' : ''
                }
                width="100%"
                onClick={this.submit}
              >
                {isProcessing ? text.proccessing : text.submit}
              </Button>
            </Form>
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(BecomeHost);
