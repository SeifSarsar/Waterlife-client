import { Component } from 'react';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../shared/buttons/Buttons.style';

import Translator from '../../shared/translations/Translator';
import { Title, FlexButton, Error } from './Account.style';
import AxiosHandler from '../../shared/AxiosHandler';
import { AuthContext } from '../../contexts/AuthContext';
import { Page } from './Account';
import { BankAccount } from '../becomeHost/BecomeHost';
import BankAccountForm from '../becomeHost/BankAccountForm';

interface Props {
  changePage(page: Page): void;
}

interface State {
  bankAccount: BankAccount;
  error: string;
  isProcessing: boolean;
}

class ChangeBankAccount extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  state: State = {
    bankAccount: new BankAccount(),
    error: '',
    isProcessing: false,
  };

  isValidForm = () => {
    const { bankName, institutionNumber, transitNumber, accountNumber } =
      this.state.bankAccount;
    return (
      bankName.length > 0 &&
      institutionNumber.length === 3 &&
      transitNumber.length === 5 &&
      accountNumber.length > 0
    );
  };

  changeBankAccount = () => {
    const user = this.context.user;
    if (!user) return;

    this.setState({ isProcessing: true });

    const { institutionNumber, transitNumber, accountNumber } =
      this.state.bankAccount;

    AxiosHandler.post(`/update/bank/${user._id}`, {
      stripeId: user.stripeId,
      stripeBankId: user.stripeBankId,
      legalName: user.firstName + ' ' + user.lastName,
      routingNumber: '0' + institutionNumber + transitNumber,
      accountNumber,
    })
      .then((res) => {
        const { stripeBankId } = res.data;

        this.context.setUser({ ...user, stripeBankId });
        //Go to confirmation page maybe!
        this.props.changePage(Page.PersonalInfo);
      })
      .catch((error) => {
        this.setState({
          error: error.response.data,
        });
      })
      .finally(() => {
        this.setState({ isProcessing: false });
      });
  };
  render() {
    const text = Translator.getAccountText();
    const { bankAccount, isProcessing, error } = this.state;
    return (
      <>
        <Title>{text.changeBankAccount} </Title>
        <BankAccountForm
          bankAccount={bankAccount}
          update={(bankAccount: BankAccount) => {
            this.setState({ bankAccount });
          }}
        ></BankAccountForm>
        {error.length > 0 && <Error>{error}</Error>}
        <FlexButton>
          <SecondaryButton
            onClick={() => this.props.changePage(Page.PersonalInfo)}
          >
            {text.cancel}
          </SecondaryButton>
          <PrimaryButton
            className={this.isValidForm() || isProcessing ? '' : 'disabled'}
            onClick={this.changeBankAccount}
          >
            {isProcessing ? Translator.getPaymentText().process : text.save}
          </PrimaryButton>
        </FlexButton>
      </>
    );
  }
}

export default ChangeBankAccount;
