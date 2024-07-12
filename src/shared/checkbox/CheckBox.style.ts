import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

export const Check = styled(FaCheck)`
  display: none;
  &.checked {
    display: block;
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  margin-right: 10px;
  border: 1px solid #b9b9b9;
  border-radius: 3px;
  cursor: pointer;

  &.checked {
    background-color: #f8f8f8;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  user-select: none;

  &:hover ${Box} {
    border-color: #a0a0a0;
  }
`;
