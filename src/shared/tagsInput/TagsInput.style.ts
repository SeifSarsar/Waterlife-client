import { FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 10px 0px;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
`;

export const Label = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  user-select: none;
  border: 1px solid #b9b9b9;
  border-radius: 50%;
  margin-right: 5px;
  font-size: 14px;
  width: 30px;
  min-width: 30px;
  height: 30px;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4da7bc;
  padding: 5px;
  border-radius: 50%;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  user-select: none;
  border: 1px solid #b9b9b9;
  cursor: pointer;
  margin-left: 3px;
  width: 25px;
  height: 25px;
  &:hover {
    border-color: #747474;
  }
`;

export const Options = styled.div`
  position: absolute;
  z-index: 1;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  user-select: none;
  border: 1px solid #b9b9b9;
  padding: 5px;
  font-size: 14px;
`;

export const ItemContainer = styled.div`
  & ${Options} {
    display: none;
  }

  &.active ${Options} {
    display: block;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 14px;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  user-select: none;
  border: 1px solid #b9b9b9;
  cursor: pointer;
  &:hover {
    border-color: #747474;
  }
`;

export const OptionButton = styled(FaChevronDown)`
  color: #4da7bc;
  font-size: 12px;
  margin-right: 3px;
`;

export const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  color: #747474;
  &:hover {
    color: #000;
  }
  &.selected {
    color: #4da7bc;
  }
`;

export const OptionDelete = styled.div`
  padding: 5px;
  cursor: pointer;
  color: #c00000;
  border-top: 1px solid #e3e3e3;
`;
