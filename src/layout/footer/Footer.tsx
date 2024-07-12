import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaPinterest, FaFacebook, FaMobileAlt } from 'react-icons/fa';
import { FiInstagram, FiMail } from 'react-icons/fi';
import Translator from '../../shared/translations/Translator';
import {
  Container,
  FirstColumn,
  TextField,
  SecondColumn,
  ThirdColumn,
  ContactContainer,
} from './Footer.style';
import { Routes } from '../../enums/Routes';
import { AuthContext } from '../../contexts/AuthContext';

const LinkStyle = {
  textDecoration: 'none',
  color: '#000000',
};

interface State {}

class Footer extends Component<State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;
  render() {
    const text = Translator.getFooterText();
    const isConnected = this.context.user !== null;
    return (
      <Container>
        <FirstColumn>
          <Link to={Routes.About} style={LinkStyle}>
            <TextField>{text.environment}</TextField>
          </Link>

          {isConnected && this.context.user?.stripeId !== undefined && (
            <Link to={Routes.CreateProduct} style={LinkStyle}>
              <TextField>{text.addlocation}</TextField>
            </Link>
          )}

          {isConnected && this.context.user?.stripeId === undefined && (
            <Link to={Routes.BecomeHost} style={LinkStyle}>
              <TextField>{text.becomehost}</TextField>
            </Link>
          )}
        </FirstColumn>
        <SecondColumn>
          <TextField>{text?.followus}</TextField>
          <ContactContainer>
            <Link to="/" style={LinkStyle}>
              <FaPinterest size="1.5em" />
            </Link>
            <Link to="/" style={LinkStyle}>
              <FiInstagram size="1.5em" />
            </Link>
            <Link to="/" style={LinkStyle}>
              <FaFacebook size="1.5em" />
            </Link>
          </ContactContainer>
        </SecondColumn>
        <ThirdColumn>
          <TextField>{text?.contact}</TextField>
          <ContactContainer>
            <FaMobileAlt size="1.5em" />
            {text?.phone}
          </ContactContainer>
          <ContactContainer>
            <FiMail size="1.5em" />
            {text?.email}
          </ContactContainer>
        </ThirdColumn>
      </Container>
    );
  }
}

export default Footer;
