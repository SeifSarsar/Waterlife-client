import styled from 'styled-components';

interface ProgressProps {
  width: number;
}

export const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const Left = styled.div`
  width: 500px;
  margin: 20px 15px 0px 15px;
  padding-right: 15px;
`;

export const Right = styled.div`
  width: 50%;
  margin-top: 20px;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
`;

export const Progress = styled.div<ProgressProps>`
  transition: 0.3s ease-in-out;
  background-color: #4da7bc;
  width: ${(props) => `${props.width}%`};
  height: 10px;
`;

export const Form = styled.div`
  overflow-y: auto;

  @media only screen and (max-width: 900px) {
    max-height: 100%;
    overflow-y: none;
  }
`;

export const FormTitle = styled.div`
  font-size: 25px;
  margin-bottom: 10px;
  color: #4da7bc;
`;

export const FieldTitle = styled.div`
  font-size: 17px;
  margin: 15px 0px 10px 0px;
  font-weight: 600;
  color: #747474;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  gap: 15px;
`;

export const Illustration = styled.img`
  width: 100%;
  max-height: 500px;
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  font-size: 17px;
  padding: 15px 10px;
  width: ${(props) => `${props.width}`};
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;
  border-width: 1px;
  border-radius: 5px;
  outline: none;
  &.invalid {
    border: 1px solid #e0181850;
    background-color: #e0181820;
  }
`;
