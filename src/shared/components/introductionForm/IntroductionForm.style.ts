import styled from 'styled-components';

export const TextArea = styled.textarea`
  font-size: 17px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #e3e3e3;
  resize: none;
  outline: none;
  background-color: #f8f8f8;
  border-radius: 5px;
  &.invalid {
    border: 1px solid #e0181850;
    background-color: #f0585810;
  }
`;
