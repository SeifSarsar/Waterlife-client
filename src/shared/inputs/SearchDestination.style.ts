import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const DestinationInput = styled(Autocomplete)`
  margin-left: 5px;
  font-size: 17px;
  width: 100%;
  outline: none;
  border: none;
  background-color: #f8f8f8;
`;

export const SearchIcon = styled(FaSearch)`
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-size: 25px;
  &:hover {
    color: #196a7d;
  }
`;
