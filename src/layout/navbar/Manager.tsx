import { Component, createRef } from 'react';
import Translator from '../../shared/translations/Translator';
import { GrUserAdmin } from 'react-icons/gr';
import { Routes } from '../../enums/Routes';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AccountType } from '../../enums/AccountType';

const AccountContainer = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  right: 0;
  z-index: 1;
`;

const DropdownTxt = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: 0.2s ease-in-out;
  &:hover {
    color: #4da7bc;
  }
`;

const BurgerMenu = styled(GiHamburgerMenu)`
  cursor: pointer;
  margin-right: 5px;
  font-size: 20px;

  @media only screen and (max-width: 900px) {
    font-size: 18px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 25px;
  border-color: #a8a8a8;
  padding: 5px 10px;
`;

interface Props {}

interface State {
  showMenu: boolean;
  refMenu: any;
  isAdmin: boolean;
}

class Manager extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showMenu: false,
      refMenu: createRef(),
      isAdmin: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.clickOutside);
    this.setState(() => ({
      isAdmin: this.context.user?.accountType === AccountType.admin,
    }));
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

  render() {
    const { showMenu, refMenu } = this.state;
    const text = Translator.getNavbarText();
    const isManager = this.context.user?.accountType === AccountType.admin;

    return (
      <AccountContainer ref={refMenu} onClick={this.toggleMenu}>
        <Flex>
          <BurgerMenu />
          <GrUserAdmin size="1.5em" />
        </Flex>
        {showMenu && (
          <Dropdown>
            <DropdownTxt to={Routes.SignUp}>{text.createaccount}</DropdownTxt>
            {isManager && (
              <DropdownTxt to={Routes.GovDue}>{text.govdue}</DropdownTxt>
            )}
          </Dropdown>
        )}
      </AccountContainer>
    );
  }
}

export default Manager;
