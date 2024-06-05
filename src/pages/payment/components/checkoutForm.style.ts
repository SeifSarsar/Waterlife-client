import styled from 'styled-components';

export const PaymentBox = styled.div`
  /* padding: 10px; */
  border-style: none;
  will-change: opacity, transform;
  border: 0.5px solid black;
  width: 98%;
  margin-bottom: 15px;

  @media only screen and (max-width: 900px) {
    width: 91%;
  }
`;

export const InputBox = styled.input`
  padding: 10px;
  border-style: none;
  will-change: opacity, transform;
  border-radius: 0px;
  border: 0.5px solid black;
  width: 98%;
  margin-bottom: 15px;

  @media only screen and (max-width: 900px) {
    width: 91%;
  }
`;

export const PaymentButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-bottom: 5px;
`;

export const LeftSecondaryButton = styled.div`
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

  &:hover {
    color: #196a7d;
    border: 1px solid #196a7d;
  }

  @media only screen and (max-width: 900px) {
    width: 9.5em;
  }
`;

export const ErrorText = styled.div`
  display: flex;
  text-align: bottom;
  vertical-align: top;
  align-self: center;
  text-align: left;
  width: 38em;
  vertical-align: top;
  font-size: 80%;
  line-height: auto;
  color: #e01818;
  padding-top: 5px;


  @media only screen and (max-width: 900px) {
    width: 23em;
  }
`;
