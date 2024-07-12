import styled from 'styled-components';

export const Circle = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;

  &.checked {
    background-color: white;
  }
`;

export const RadioButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid #b9b9b9;
  margin-right: 10px;

  &.checked {
    background-color: #4da7bc;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  cursor: pointer;
  user-select: none;

  &:hover ${RadioButton} {
    border-color: #a0a0a0;
  }
`;
