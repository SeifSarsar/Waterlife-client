import Translator from '../translations/Translator';
import { Container, Title, Message } from './NoResult.style';

interface Props {
  message: string;
}

const NoResult = (props: Props) => {
  const text = Translator.getNoResult();
  return (
    <Container>
      <Title>{text}</Title>
      <Message>{props.message}</Message>
    </Container>
  );
};

export default NoResult;
