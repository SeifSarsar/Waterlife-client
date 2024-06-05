import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../enums/Routes';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import Translator from '../../shared/translations/Translator';

const Container = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 900px) {

  }
`;

const Header = styled.div`
  height: 600px;
  width: 100vw;
  background: black;
  overflow: hidden;

  @media only screen and (max-width: 900px) {

  }
`;

const Image = styled.img`
  opacity: 0.4;
  width: 100%;
  object-fit: cover;

  @media only screen and (max-width: 1100px) {
    
  }
`;

const TextContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 600px;
  top: 80px;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  text-align: center;

  @media only screen and (max-width: 1100px) {
    
  }
`;

const Title = styled.div`
  font-size: 200px;
  font-weight: bold;

  @media only screen and (max-width: 1100px) {
    
  }
`;

const Text = styled.div`
  font-size: 70px;
  padding-bottom: 50px;

  @media only screen and (max-width: 1100px) {
    
  }
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

interface Props {}

class NotFoundPage extends Component<Props> {

  openWindow(link: string){
    window.open(link)
  }

  render() {
    const text = Translator.getNotFoundPage();

    return(
      <Container>
        <Header>
          <Image src="lake-1802337.jpg" />
          <TextContainer>
            <Title>
              {text.error}
            </Title>
            <Text>
              {text.text}
            </Text>
            <LinkButton to={Routes.Home}>
              <PrimaryButton width="25%">
                {text.button}
              </PrimaryButton>
            </LinkButton>
          </TextContainer>
        </Header>
      </Container>
    );
  }
};

export default NotFoundPage;
