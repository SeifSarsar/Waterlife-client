import { Component } from 'react';

import { Flex, Label } from './BecomeHost.style';

import Translator from '../../shared/translations/Translator';
import { AuthContext } from '../../contexts/AuthContext';
import { Input } from '../../shared/inputs/Inputs.style';
import { PersonalInfo } from './BecomeHost';

interface Props {
  personalInfo: PersonalInfo;
  update(personalInfo: PersonalInfo): void;
}

interface State {}

class PersonalInfoForm extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
  readonly today: string;

  render() {
    const { dateOfBirth, address } = this.props.personalInfo;
    const text = Translator.getCreateProductText().positionForm;

    return (
      <>
        <div>
          <Label>{Translator.getBecomeHostText().dob}</Label>
          <Input
            className={dateOfBirth === '' ? 'invalid' : ''}
            width="100%"
            type="date"
            value={dateOfBirth}
            onKeyDown={(e) => e.preventDefault()}
            max={this.today}
            onChange={(e) =>
              this.props.update({
                ...this.props.personalInfo,
                dateOfBirth: e.target.value,
              })
            }
          ></Input>
        </div>
        <div>
          <Label>{text.street}</Label>
          <Input
            className={address.street === '' ? 'invalid' : ''}
            width="100%"
            value={address.street}
            onChange={(e) =>
              this.props.update({
                ...this.props.personalInfo,
                address: {
                  ...address,
                  street: e.target.value,
                },
              })
            }
          ></Input>
        </div>
        <div>
          <Label>{text.city}</Label>
          <Input
            className={address.city === '' ? 'invalid' : ''}
            width="100%"
            value={address.city}
            onChange={(e) =>
              this.props.update({
                ...this.props.personalInfo,
                address: {
                  ...address,
                  city: e.target.value,
                },
              })
            }
          ></Input>
        </div>
        <Flex>
          <div>
            <Label>{text.state}</Label>
            <Input
              className={address.state === '' ? 'invalid' : ''}
              width="100%"
              value={address.state}
              onChange={(e) =>
                this.props.update({
                  ...this.props.personalInfo,
                  address: {
                    ...address,
                    state: e.target.value,
                  },
                })
              }
            ></Input>
          </div>
          <div>
            <Label>{text.code}</Label>
            <Input
              className={address.postalCode === '' ? 'invalid' : ''}
              width="100%"
              value={address.postalCode}
              onChange={(e) =>
                this.props.update({
                  ...this.props.personalInfo,
                  address: {
                    ...address,
                    postalCode: e.target.value,
                  },
                })
              }
            ></Input>
          </div>
        </Flex>
      </>
    );
  }
}

export default PersonalInfoForm;
