import { SecondaryButton, PrimaryButton } from '../../shared/buttons/Buttons.style';
import { Component } from 'react';
import { HiBadgeCheck } from 'react-icons/hi';

import { RouteComponentProps, withRouter } from 'react-router';
import Translator from '../../shared/translations/Translator';

import {
  ButtonContainer,
  LinkButton,
  SuccessBox,
  SuccessTitle,
  SuccessPage,
  TextBox,
} from './SuccessPayment.style';
import { Routes } from '../../enums/Routes';

interface Props extends RouteComponentProps {}

class SuccessPayment extends Component<Props> {
  render() {
    const text = Translator.getSuccessText();

    return (
      <SuccessPage>
        <SuccessBox>
          <HiBadgeCheck color="#4da7bc" size="50px" />
          <SuccessTitle>{text.title}</SuccessTitle>
          <br />

          <TextBox>{text.message1}</TextBox>
          <br />
          <TextBox>{text.message2}</TextBox>
          <br />
          <TextBox>{text.message3}</TextBox>
          <ButtonContainer>
            <LinkButton to={Routes.Home}>
              <SecondaryButton>{text.secondarybutton}</SecondaryButton>
            </LinkButton>
            <LinkButton to={Routes.Historic}>
              <PrimaryButton>{text.primarybutton}</PrimaryButton>
            </LinkButton>
          </ButtonContainer>
        </SuccessBox>
      </SuccessPage>
    );
  }
}

export default withRouter(SuccessPayment);
