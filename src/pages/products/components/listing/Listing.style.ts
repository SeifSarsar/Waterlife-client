import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Link)<{ $hovered: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #f8f8f8;
  text-decoration: none;
  box-shadow: ${(props) =>
    props.$hovered
      ? '0 0.5rem 1rem rgba(0, 0, 0, 0.25)'
      : '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'};
`;

export const Image = styled.img`
  height: 180px;
  width: 100%;
  border-radius: 5px 5px 0px 0px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  color: #000000;
`;

export const Title = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export const Address = styled.div`
  font-size: 15px;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  font-size: small;
`;

export const Type = styled.div`
  font-size: 10px;
  color: #4da7bc;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Rating = styled.span`
  margin-left: 2px;
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

export const EditAndDelete = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-top: 5px;
`;
