import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import 'react-edit-text/dist/index.css';
import '../../FireBaseApp';
import {
  Container,
  FlexContainer,
  InformationContainer,
} from './Account.style';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import PersonalInfo from './PersonalInfo';
import ChangeBankAccount from './ChangeBankAccount';

export enum Page {
  PersonalInfo,
  Password,
  Email,
  Bank,
}

interface Props extends RouteComponentProps {}

interface State {
  page: Page;
}

class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { page: Page.PersonalInfo };
  }

  onChangePage = (page: Page) => {
    window.scrollTo(0, 0);
    this.setState({ page });
  };

  render() {
    const { page } = this.state;
    return (
      <Container>
        <FlexContainer>
          <InformationContainer>
            {page === Page.PersonalInfo && (
              <PersonalInfo changePage={this.onChangePage} />
            )}

            {page === Page.Email && (
              <ChangeEmail changePage={this.onChangePage} />
            )}

            {page === Page.Password && (
              <ChangePassword changePage={this.onChangePage} />
            )}

            {page === Page.Bank && (
              <ChangeBankAccount changePage={this.onChangePage} />
            )}
          </InformationContainer>
        </FlexContainer>
      </Container>
    );
  }
}

export default withRouter(Account);
