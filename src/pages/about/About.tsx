import { Component } from 'react';
import Translator from '../../shared/translations/Translator';
import { 
  Box, 
  Column, 
  Container,
  FirstImg,
  Logo,
  LogoLink,
  LongBox,
  SecondImg,
  Text,
  ThirdImg,
  Title, 
} from './About.style';



interface Props {}

interface State {}


class About extends Component<Props, State> {

  openWindow(link: string){
    window.open(link)
  }

  render() {
    const text = Translator.getAboutText();

    return(
      <Container>
        <Logo src={Translator.getLogo()} />

        <Box>
          <Column>
            <Title>
              {text.firsttitle}
            </Title>
            <Text>
              {text.firsttext}
            </Text>
          </Column>
          <FirstImg src="/images/environnement/photo1.jpg" />
        </Box>

        <LongBox>
          <SecondImg src="/images/environnement/photo2.jpg" />
          <Column>
            <Title>
              {text.secondtitle}
            </Title>
            <Text>
              {text.secondtext1}
            </Text>
            <Text>
              {text.secondtext2}
            </Text>
            <Text>
              {text.secondtext3}
            </Text>
            <LogoLink onClick={() => {this.openWindow('https://www.arbre-evolution.org/')}}>
              <Logo 
                src="https://static.wixstatic.com/media/9c5a2d_62c5b46191664464ea903dbf2d225c5d.png/v1/fill/w_146,h_102,al_c,q_85,usm_0.66_1.00_0.01/9c5a2d_62c5b46191664464ea903dbf2d225c5d.webp" 
              />
            </LogoLink>
          </Column>
        </LongBox>

        <LongBox>
          <Column>
            <Title>
              {text.thirdtitle}
            </Title>
            <Text>
              {text.thirdtext}
            </Text>
            <LogoLink onClick={() => {this.openWindow('https://aquaaction.org/')}}>
              <Logo 
                src="https://aquahacking.com/wp-content/uploads/2021/07/Aqua_action.png" 
              />
            </LogoLink>
          </Column>
          <ThirdImg src="/images/environnement/photo3.jpg" />
        </LongBox>
      </Container>
    );
  }
};

export default About;
