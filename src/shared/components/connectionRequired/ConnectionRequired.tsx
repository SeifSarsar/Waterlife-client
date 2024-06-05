import { Component } from 'react';
import Translator from '../../../shared/translations/Translator';
import { AuthContext } from '../../../contexts/AuthContext';
import SignIn from '../../../pages/signin/SignIn';
import SignUp from '../../../pages/signup/SignUp';
import {
  Container,
  PageTitle,
  TextContainer,
  NormalText,
  LinkText,
} from './ConnectionRequired.style';

interface Props {
  setIsConnected: any;
}

interface State {
  signIn: boolean;
  signUp: boolean;
}

class ConnectionRequired extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      signIn: true,
      signUp: false,
    };

    this.onConnected = this.onConnected.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    const connected = this.context.user !== null;
    this.props.setIsConnected(connected);
  }

  onConnected(state: boolean) {
    if (state) {
      this.props.setIsConnected(state);
    }
  }

  onSignUp() {
    this.setState(() => ({
      signIn: false,
      signUp: true,
    }));
  }

  onSignIn() {
    this.setState(() => ({
      signIn: true,
      signUp: false,
    }));
  }

  render() {
    const text = Translator.getConnectionRequireText();
    const { signIn, signUp } = this.state;

    return (
      <Container>
        <PageTitle>{text.title}</PageTitle>
        {signIn && (
          <div>
            <TextContainer>
              <NormalText> {text.signIn} </NormalText>
              <div> &nbsp;or&nbsp; </div>
              <LinkText onClick={this.onSignUp}> {text.signUp} </LinkText>
            </TextContainer>
            <SignIn embededPage={true} onConnected={this.onConnected} />
          </div>
        )}

        {signUp && (
          <div>
            <TextContainer>
              <LinkText onClick={this.onSignIn}> {text.signIn} </LinkText>
              <div> &nbsp;or&nbsp; </div>
              <NormalText> {text.signUp} </NormalText>
            </TextContainer>
            <SignUp embededPage={true} onConnected={this.onConnected} />
          </div>
        )}
      </Container>
    );
  }
}

export default ConnectionRequired;
