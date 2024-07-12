import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    padding-bottom: 30px;
  }
`;

export const ListingContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EditAndDelete = styled.div`
    display: flex;
    justify-content: space-between;
    background-color:  #f8f8f8;
    padding-left:15px;
    padding-right:15px;
    padding-bottom:5px;
`;


export const ButtonContainer = styled.div`
  display: flex;
  align-self: top;
  gap: 10px;
  flex-direction: column;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const MobileButtonContainer = styled.div`
  display: none;

  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
  `;

export const MobileIconContainer = styled.div`
  display: none;
  
  @media only screen and (max-width: 900px) {
    display: flex;
    align-self: flex-end;
    font-size: 25px;
    padding-bottom: 10px;
    gap: 1em;
  }
`;

export const LinkButton = styled(Link)`
  @media only screen and (max-width: 900px) {
    display: flex;
    text-decoration: none;
  }
`;


export const TextLink = styled.span`
  text-decoration: underline;
  color: #6ea7ba;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    align-self: auto;
  }
`;

export const List = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  @media only screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const Title = styled.div`
  font-size: 25px;
  color: #4da7bc;
  font-weight: 600;
`;