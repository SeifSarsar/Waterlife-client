import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

export const AccountContainer = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  right: 0;
  z-index: 2;
`;

export const DropdownTxt = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: 0.2s ease-in-out;
  &:hover {
    color: #4da7bc;
  }
`;

export const Hr = styled.hr`
  margin: 5px 0px;
`;

export const BurgerMenu = styled(GiHamburgerMenu)`
  cursor: pointer;
  margin-right: 5px;
  font-size: 20px;

  @media only screen and (max-width: 900px) {
    font-size: 18px;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 25px;
  border-color: #a8a8a8;
  padding: 2px 5px 2px 10px;
  margin-bottom: 15px;
`;
