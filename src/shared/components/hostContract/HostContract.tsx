import Translator from '../../translations/Translator';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`;
const Logo = styled.img`
  height: 80px;
  width: 180px;
  margin: 15px 0px 40px 0px;
  align-self: center;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
const Title = styled.div`
  font-size: 23px;
  font-weight: bold;
`;
const Spacing = styled.div`
  height: 20px;
`;


const HostContract = () => {
  const text = Translator.getContract();
  return (
    <Container>
      <Logo src={Translator.getLogo()} />
      <Title> {text.title} </Title>
      <li> {text.condition} </li>
      <li>{text.access} </li>
      <li> {text.dog} </li>
      <li> {text.embarcations} </li>
      <li> {text.deposit} </li>
      <li> {text.ban} </li>
      <li> {text.breakage} </li>
      <Spacing/>
      <Title> {text.title2} </Title>
      <li> {text.gaz} </li>
      <li> {text.charge} </li>
      <li> {text.doc} </li>
    </Container>
  );
};

export default HostContract;
