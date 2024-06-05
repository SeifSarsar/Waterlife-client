import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
`;

export const PageTitle = styled.p`
  width: inherit;
  font-size: 25px;
  margin-top: 45px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NormalText = styled.div`
  display: flex;
`;

export const LinkText = styled.div`
  display: flex;
  cursor: pointer;
  text-decoration: underline;
`;