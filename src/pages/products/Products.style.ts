import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`;

export const Filters = styled.div`
  display: flex;
  color: black;
  font-weight: 400;
`;

export const FilterInput = styled.input`
  margin-left: 5px;
  font-size: 15px;
  width: 150px;
  text-decoration: none;
  outline: none;
  border: none;
  color: #4da7bc;
`;

export const MapContainer = styled.div`
  width: 60%;
  height: 550px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const Result = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
`;

export const List = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 550px;
  overflow-y: auto;
  width: 100%;
`;
