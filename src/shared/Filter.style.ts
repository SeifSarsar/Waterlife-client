import styled from 'styled-components';

export const FilterButtonTitle = styled.span`
  font-size: 15px;
  margin-left: 5px;

  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

export const FilterButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  margin-right: 10px;
  padding: 8px 10px;
  height: 35px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  user-select: none;
  border: 1px solid #e3e3e3;
`;

export const SearchButton = styled(FilterButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #4da7bc;
  border-radius: 100%;
  transition: 0.3s ease-in-out;
  width: 35px;

  &:hover {
    background-color: #196a7d;
  }

  @media only screen and (max-width: 900px) {
    margin: 0px;
    padding: 0px 5px;
  }
`;

export const FilterWindow = styled.div`
  display: none;
  position: absolute;
  margin-top: 5px;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 1;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;

  &.active {
    display: block;
  }
`;

export const RightFilterWindow = styled.div`
  display: none;
  position: absolute;
  margin-top: 5px;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 1;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;

  &.active {
    display: block;
  }
`;

export const ClearFilter = styled.div`
  margin-top: 5px;
  cursor: pointer;
  color: #747474;
  float: right;
  &:hover {
    color: #4da7bc;
  }
`;
