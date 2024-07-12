import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 100%;
`;

export const Logo = styled.img`
  margin-right: 20px;
  height: 80px;

  @media only screen and (max-width: 900px) {
    height: 50px;
    margin-right: 0px;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  text-decoration: none !important;
  color: #000000;
  font-size: 20px;

  :hover {
    color: #4da7bc;
  }
`;

export const DestinationContainer = styled.div`
  display: flex;
  align-items: center;
  color: #4da7bc;
  font-size: 20px;
  padding: 10px;
  width: 40%;
  min-width: 300px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f8f8f8;
  margin-left: 10px;
  border: 1px solid #e3e3e3;
  border-width: 1px;
  border-radius: 5px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const MobileDestinationContainer = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    color: #4da7bc;
    font-size: 20px;
    padding: 10px 10px;
    width: 100%;
    min-width: 300px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f8f8f8;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    margin-right: 20px;
  }
`;
