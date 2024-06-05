import { PrimaryButton } from "../../shared/buttons/Buttons.style"
import { Component } from "react";
import { HiBadgeCheck } from "react-icons/hi";

import { RouteComponentProps, withRouter } from "react-router";
import Translator from '../../shared/translations/Translator';


import {
    SuccessBox,
    SuccessTitle,
    SuccessPage,
    TextBox,
  } from "./SuccessRefund.style";
import { Routes } from "../../enums/Routes";
import { Link } from "react-router-dom";

interface Props extends RouteComponentProps {}

class SuccessPayment extends Component<Props> {
  render() {
    const text = Translator.getSuccessRefund();
    
    return (
    <SuccessPage>
      <SuccessBox>
          <HiBadgeCheck color="#4da7bc" size="50px"/>
          <SuccessTitle>
              {text.title}
          </SuccessTitle>
          <br />

          <TextBox>
        {text.message1}
        </TextBox>
        <br />
        <TextBox>
        {text.message2}
        </TextBox>
        <br />
        <TextBox>
            {text.message3}
        </TextBox>
        <br />
          <Link to={Routes.Home} style={{textDecoration: 'none'}}>
            <PrimaryButton width="150px">
                {text.button}
            </PrimaryButton>
          </Link>
      </SuccessBox>
      </SuccessPage>
    );
  }
}

export default withRouter(SuccessPayment);
