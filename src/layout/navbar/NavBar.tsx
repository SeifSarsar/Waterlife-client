import { Component, createRef } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Language from './Language';
import Device from './Device';
import Account from './Account';
import { Routes } from '../../enums/Routes';
import SearchDestination from '../../shared/inputs/SearchDestination';
import Translator from '../../shared/translations/Translator';
import {
  DestinationContainer,
  Left,
  Logo,
  MobileDestinationContainer,
  Right,
  Flex,
  Top,
  Container,
} from './NavBar.style';
import { AuthContext } from '../../contexts/AuthContext';
import Manager from './Manager';
import { AccountType } from '../../enums/AccountType';

interface Props extends RouteComponentProps {
  onSearchDestination(place: google.maps.places.PlaceResult): void;
}

interface State {
  showSearchBar: boolean;
  refMenu: any;
}

class NavBar extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showSearchBar: false,
      refMenu: createRef(),
    };
    this.onRouteChanged = this.onRouteChanged.bind(this);

    this.searchDestination = (
      <SearchDestination
        types={['geocode']}
        onSearchDestination={this.props.onSearchDestination}
        placeholder="Destination"
        defaultValue=""
      />
    );
  }

  searchDestination: JSX.Element;

  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState(() => ({
      showSearchBar: this.props.location.pathname !== Routes.Home,
    }));
    window.scrollTo(0, 0);
  }

  isActiveNav(navName: string) {
    if (this.props.location.pathname === navName)
      return {
        color: '#4da7bc',
      };
  }

  verifyAccountType() {
    return (
      this.context.user?.accountType === AccountType.admin ||
      this.context.user?.accountType === AccountType.manager
    );
  }

  render() {
    const { showSearchBar, refMenu } = this.state;
    const connected = this.context.user !== null;

    return (
      <Container ref={refMenu}>
        <Top>
          <Left>
            <Link to={Routes.Home}>
              <Logo src={Translator.getLogo()} />
            </Link>

            {showSearchBar && (
              <DestinationContainer>
                {this.searchDestination}
              </DestinationContainer>
            )}
          </Left>

          <Right>
            <Flex>
              <Language />
              <Device />
            </Flex>

            <Flex>
              {connected && this.verifyAccountType() && <Manager />}
              <Account />
            </Flex>
          </Right>
        </Top>

        {showSearchBar && (
          <MobileDestinationContainer>
            {this.searchDestination}
          </MobileDestinationContainer>
        )}
      </Container>
    );
  }
}

export default withRouter(NavBar);
