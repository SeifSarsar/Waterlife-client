import styled from 'styled-components';

export const RefundButton = styled.div`
  display: flex;
  align-self: right;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 3em;
  width: 22em;
  margin-top: 5%;
  background-color: #4da7bc;
  color: #ffffff;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-top: 2em;

  &:hover {
    background-color: #196a7d;
  }

  @media only screen and (max-width: 900px) {
    width: 9.5em;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 3%;
  padding-bottom: 5px;
  justify-content: center;
`;

export const ReturnButton = styled.div`
 display: flex;
  align-self: left;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 3em;
  width: 22em;
  margin-top: 5%;
  background-color: #ffffff;
  color: #4da7bc;
  border: 1px solid #4da7bc;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-top: 2em;

  &:hover {
    color: #196a7d;
    border: 1px solid #196a7d;
  }

  @media only screen and (max-width: 900px) {
    width: 9.5em;
  }
  
`;

export const RefundTitle = styled.div`
    font-size: 30px;
    color: black;
    font-weight: bold;
    text-align: center;
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