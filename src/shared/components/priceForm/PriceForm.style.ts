import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10em;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  border: 1px solid #e3e3e3;
  outline: none;
  width: 200px;
  padding: 15px 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  &.invalid {
    border: 1px solid #e0181850;
    background-color: #f0585810;
  }
`;

export const PriceInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: 17px;
  width: 50%;
  margin-left: 10px;
  height: 100%;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0px;
  }
`;

export const PriceRate = styled.span`
  font-weight: 600;
  border-left: 2px solid #000000;
  padding-left: 15px;
`;

export const PriceLabel = styled.span`
  font-weight: 600;
`;

export const Note = styled.span`
  font-size: 12px;
`;
