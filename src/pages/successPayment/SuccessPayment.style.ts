import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SuccessBox = styled.div`
  width: 75%;
  border: 2px solid #4da7bc;
  padding: 50px;
  margin: auto;
  text-align: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media only screen and (max-width: 900px) {
    width: 95%;
    padding: 10px;
  }
`;
export const TextBox = styled.div`

`;
export const SuccessTitle = styled.div`
    font-size: 20px;
    color: #00D100;
    font-weight: bold;
`;

export const SuccessPage = styled.div`
    display: flex;
    flex: 1 1 auto;
    height:100%;
    margin: 12.5% 0;

  @media only screen and (max-width: 900px) {
    margin: 12.5% 5%;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 30px;

  @media only screen and (max-width: 900px) {
    gap: 10px;
  }
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  width: 30%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;
