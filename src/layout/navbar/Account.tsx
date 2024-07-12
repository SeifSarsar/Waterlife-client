import { Component, createRef } from 'react';
import Translator from '../../shared/translations/Translator';
import { MdAccountCircle } from 'react-icons/md';
import { Routes } from '../../enums/Routes';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../FireBaseApp';
import {
  AccountContainer,
  Dropdown,
  DropdownTxt,
  BurgerMenu,
  Flex,
  Hr,
} from './Account.style';
import ModalDialog from '../../shared/modal/Modal'

interface Props {}

interface State {
  showMenu: boolean;
  refMenu: any;
  showModal: boolean;
}

class Account extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showMenu: false,
      refMenu: createRef(),
      showModal: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.clickOutside);
  }

  clickOutside(event: MouseEvent) {
    const target = event.target as Node | null;
    if (!this.state.refMenu.current.contains(target)) {
      this.setState(() => ({
        showMenu: false,
      }));
    }
  }

  toggleMenu() {
    this.setState((state: State) => ({
      showMenu: !state.showMenu,
    }));
  }

  disconnect = async () => {
    // Sign up code here.
    await signOut(auth)
      .then(() => {
        this.context.setUser(null);
        // Sign-out successful.
        this.setState({ showModal: true });
      })
      .catch(() => {
        // An error happened.
      });
  };

  render() {
    const { showMenu, refMenu, showModal } = this.state;
    const text = Translator.getNavbarText();
    const connected = this.context.user !== null;
    return (
      <AccountContainer ref={refMenu} onClick={this.toggleMenu}>
        <Flex>
          <BurgerMenu />
          <MdAccountCircle
            size="1.8em"
            color={connected ? '#4da7bc' : '#000000'}
          />
        </Flex>
        {showMenu && !connected && (
          <Dropdown>
            <DropdownTxt to={Routes.SignIn}> {text.connection} </DropdownTxt>
            <DropdownTxt to={Routes.SignUp}> {text.inscription} </DropdownTxt>
          </Dropdown>
        )}
        {showMenu && connected && (
          <Dropdown>
            <DropdownTxt to={Routes.Account}>
              {text.accountmanagement}
            </DropdownTxt>
            <DropdownTxt to={Routes.Historic}> {text.historic} </DropdownTxt>
            <Hr />
            {this.context.user?.stripeId ? (
              <DropdownTxt to={Routes.CreateProduct}>
                {text.addlocation}
              </DropdownTxt>
            ) : (
              <DropdownTxt to={Routes.BecomeHost}>
                {text.becomehost}
              </DropdownTxt>
            )}
            <DropdownTxt to={Routes.MyRentals}> {text.rentals} </DropdownTxt>

            <Hr />
            <DropdownTxt to={Routes.Home} onClick={this.disconnect}>
              {text.logout}
            </DropdownTxt>
          </Dropdown>
        )}

        <ModalDialog
          show={showModal}
          handleClose={() => {this.setState({ showModal: false });}}
          onConfirm={() => {this.setState({ showModal: false });}}
          title={Translator.getNavbarText().logoutsuccess}
          secondaryBtn={false}
          primaryBtnText={"Ok"}
        />

      </AccountContainer>
    );
  }
}

export default Account;
