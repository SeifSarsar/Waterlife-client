import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export const HorizontalFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  user-select: none;
`;

export const NumberFilter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const Value = styled.div`
  margin: 0px 5px;
`;

export const Label = styled.div``;

export const MinusIcon = styled(FaMinus)`
  font-size: 14px;
`;

export const PlusIcon = styled(FaPlus)`
  font-size: 14px;
`;

export const CountButton = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #b9b9b9;
  width: 22px;
  height: 22px;
  box-sizing: border-box;

  &:hover {
    border-color: #a0a0a0;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  justify-content: space-evenly;
`;

export const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b9b9b9;
  border-radius: 5px;
  padding: 5px 0px;
  width: 48%;
`;

export const Slider = styled(Range)`
  width: 250px;
  margin: 0px 10px;
  & .rc-slider-track {
    background-color: #4da7bc;
  }

  & .rc-slider-handle {
    border-color: #4da7bc;
  }

  & .rc-slider-handle.rc-slider-handle-dragging {
    box-shadow: 0 0 0 5px #4da7bc;
  }
`;
