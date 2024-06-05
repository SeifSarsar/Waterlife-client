import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 3%;
  padding-bottom: 5px;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    gap: 5px;
    margin-top: 30px;
  }
`;

export const RefundTitle = styled.div`
    font-size: 30px;
    color: black;
    font-weight: bold;
    text-align: center;
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 100%;
  justify-content: center;
  
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const RefundPage = styled.div`
  width: 75%;
  border: 2px solid #4da7bc;
  padding: 50px;
  margin: auto;
  text-align: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top:2em;

  @media only screen and (max-width: 900px) {
    margin: 12.5% 5%;
    width: 90%;
    padding: 20px;
  }
`;

export const TextBox = styled.div`
  margin-top: 1em;
  text-align: center;
`;

export const ImportantTitle = styled.div`
    font-size: 30px;
    color: black;
    font-weight: bold;
    text-align: center;
    margin-top: 2em;
    color: red;
`;