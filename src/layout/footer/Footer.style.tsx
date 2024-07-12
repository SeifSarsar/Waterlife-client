import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  box-shadow: 0 0.11rem 0.25rem rgba(0, 0, 0, 1);

  @media only screen and (max-width: 900px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media only screen and (max-width: 1150px) {
    width: 100%;
    display: none;
  }
`;

export const TextField = styled.div`
  color: #000000;
  padding: 15px;
  font-size: 18px;
`;

export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  @media only screen and (max-width: 1150px) {
    width: 100%;
    flex-direction: row;
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
  padding: 10px;
  gap: 15px;
`;

export const ThirdColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  @media only screen and (max-width: 1150px) {
    width: 100%;
  }
`;
