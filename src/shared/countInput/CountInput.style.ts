import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  user-select: none;
`;

export const CountLabel = styled.div`
  width: 100px;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;

  margin-left: 20px;
`;

export const CountButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #b9b9b9;
  border-radius: 50%;
  padding: 3px;
  width: 30px;
  height: 30px;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  &:hover {
    border-color: #747474;
  }
`;

export const CountValue = styled.div`
  margin: 0px 10px;
`;
