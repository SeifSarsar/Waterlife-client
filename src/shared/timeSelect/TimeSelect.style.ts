import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const Select = styled.select`
  height: 40px;
  width: 100px;
  border-radius: 5px;
  border: 1px solid #b9b9b9;
  margin: 0px 20px 0px 10px;

  &.invalid {
    border: 1px solid #e0181850;
    background-color: #e0181820;
  }
`;
