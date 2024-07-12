import { Component } from 'react';
import { Check, Box, Container } from './CheckBox.style';

interface Props {
  checked: boolean;
  label: string;
  action(): void;
}

interface State {}

class ReverseCheckBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onClick = () => {
    this.props.action();
  };
  render() {
    const { label, checked } = this.props;
    return (
      <Container>
        <div style={{ paddingRight: '10px' }}>{label}</div>
        <Box className={checked ? 'checked' : ''} onClick={this.onClick}>
          <Check color="#4da7bc" className={checked ? 'checked' : ''}></Check>
        </Box>
      </Container>
    );
  }
}
export default ReverseCheckBox;
