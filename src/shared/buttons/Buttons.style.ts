import styled from 'styled-components';

export const PrimaryButton = styled.div<{ width?: string }>`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #4da7bc;
  color: #ffffff;
  border: 1px solid transparent;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  padding: 15px 5px;

  &:hover {
    background-color: #196a7d;
  }

  &.disabled {
    background-color: #e3e3e3;
    pointer-events: none;
  }

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;

export const SecondaryButton = styled.div<{ width?: string }>`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  color: #4da7bc;
  border: 1px solid #4da7bc;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  padding: 15px 5px;
  &:hover {
    color: #196a7d;
    border: 1px solid #196a7d;
  }

  &.disabled {
    border: 1px solid #e3e3e3;
    color: #e3e3e3;
    pointer-events: none;
  }

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;