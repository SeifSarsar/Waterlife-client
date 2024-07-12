import styled from 'styled-components';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';

export const Container = styled.div`
  padding: 20px;
`;

export const Form = styled.div`
  width: 30%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 900px) {
    width: 100%;
    min-width: auto;
  }
`;

export const Error = styled.div`
  color: #ff0000;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  font-size: 25px;
  color: #4da7bc;
`;

export const CardContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #e3e3e3;
  background-color: #f8f8f8;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
`;

export const Label = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Button = styled(PrimaryButton)`
  margin-top: 5%;
  align-self: left;
`;

export const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 15px;
`;

export const Step = styled.span`
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
`;

export const ActiveStep = styled.span`
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 1;
`;

export const ContractContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  row-gap: 8px;
  font-weight: 500;
  font-size: 18px;

  @media only screen and (max-width: 900px) {
    padding: 10px;
  }
`;
