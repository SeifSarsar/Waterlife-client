import { Component } from 'react';

import { Flex, Label } from './BecomeHost.style';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Input, InputError } from '../../shared/inputs/Inputs.style';
import { BankAccount } from './BecomeHost';
import Translator from '../../shared/translations/Translator';

interface Props extends RouteComponentProps {
  bankAccount: BankAccount;
  update(bankAccount: BankAccount): void;
}

interface State {}

class BankAccountForm extends Component<Props, State> {
  render() {
    const text = Translator.getBecomeHostText();
    const { bankName, institutionNumber, transitNumber, accountNumber } =
      this.props.bankAccount;
    return (
      <>
        <div>
          <Label>{text.bank}</Label>
          <Input
            className={bankName === '' ? 'invalid' : ''}
            width="100%"
            value={bankName}
            onChange={(e) =>
              this.props.update({
                ...this.props.bankAccount,
                bankName: e.target.value,
              })
            }
          ></Input>
        </div>
        <div>
          <Label>{text.account}</Label>
          <Input
            className={accountNumber === '' ? 'invalid' : ''}
            width="100%"
            value={accountNumber}
            onChange={(e) =>
              this.props.update({
                ...this.props.bankAccount,
                accountNumber: e.target.value,
              })
            }
          ></Input>
        </div>
        <Flex>
          <div>
            <Label>{text.institution}</Label>
            <Input
              className={institutionNumber.length !== 3 ? 'invalid' : ''}
              width="100%"
              value={institutionNumber}
              maxLength={3}
              onChange={(e) =>
                this.props.update({
                  ...this.props.bankAccount,
                  institutionNumber: e.target.value,
                })
              }
            ></Input>
            {institutionNumber.length !== 3 && (
              <InputError>
                {text.institutionmin}
              </InputError>
            )}
          </div>
          <div>
            <Label>{text.transit}</Label>
            <Input
              className={transitNumber.length !== 5 ? 'invalid' : ''}
              width="100%"
              value={transitNumber}
              maxLength={5}
              onChange={(e) =>
                this.props.update({
                  ...this.props.bankAccount,
                  transitNumber: e.target.value,
                })
              }
            ></Input>
            {transitNumber.length !== 5 && (
              <InputError>
                {text.transitmin}
              </InputError>
            )}
          </div>
        </Flex>
      </>
    );
  }
}

export default withRouter(BankAccountForm);
