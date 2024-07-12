import { Component } from 'react';
import { ContractContainer } from './BecomeHost.style';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import Translator from '../../shared/translations/Translator';
import { RouteComponentProps, withRouter } from 'react-router';
import HostContract from '../../shared/components/hostContract/HostContract';

interface Props extends RouteComponentProps {
  next(): void;
}

class Contract extends Component<Props> {
  render() {
    const text = Translator.getBecomeHostText();
    const { next } = this.props;
    return (
      <ContractContainer>
        <HostContract />
        <PrimaryButton onClick={next} width="50%">
          {text.acceptContract}
        </PrimaryButton>
      </ContractContainer>
    );
  }
}

export default withRouter(Contract);
