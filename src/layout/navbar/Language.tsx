import { FaGlobe } from 'react-icons/fa';
import styled from 'styled-components';
import { Component } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Languages } from '../../enums/Language';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Span = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;

class Language extends Component {
  render() {
    const { language, setLanguage } = this.context;
    return (
      <Container
        onClick={() =>
          setLanguage(
            language === Languages.English
              ? Languages.French
              : Languages.English
          )
        }
      >
        <FaGlobe />
        {this.context && <Span> {language} </Span>}
      </Container>
    );
  }
}

Language.contextType = LanguageContext;

export default Language;
