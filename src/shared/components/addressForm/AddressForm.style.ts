import styled from 'styled-components';
import { Input } from '../../inputs/Inputs.style';

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddressInput = styled(Input)`
  margin-top: 10px;
`;

export const Map = styled.div`
  width: 100%;
  height: 375px;
`;

export const Verify = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 46.5%;
  margin-top: 10px;
  background-color: #196a7d;
  color: #ffffff;
  cursor: pointer;
  padding: 15px 5px;
`;
