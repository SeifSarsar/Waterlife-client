import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  /* cursor: pointer; */
  margin-bottom: 20px;
`;
const Span = styled.span`
  margin-left: 12px;
  font-size: 14px;
  width: 40px;
`;
const Device: FunctionComponent = () => {
  return (
    <Container>
      <Span>$ CAD</Span>
    </Container>
  );
};

export default Device;
