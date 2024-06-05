import styled from 'styled-components';

export const Input = styled.input`
  display: flex;
  align-items: center;
  font-size: 17px;
  padding: 15px 10px;
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;
  border-width: 1px;
  border-radius: 5px;
  outline: none;
  transition: 0.3s ease-in-out;

  &.invalid {
    border: 1px solid #e0181850;
    background-color: #f0585810;
  }
`;

export const InputError = styled.div`
  font-size: 10px;
  color: #e01818;
  margin-top: 3px;
`;
