import { Component } from 'react';
import { Check, Box, Container } from './CheckBox.style';

interface Props {
  checked: boolean;
  label: string;
  action(): void;
}

interface State {}

class CheckBox extends Component<Props, State> {
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
      <Container onClick={this.onClick}>
        <Box className={checked ? 'checked' : ''}>
          <Check color="#4da7bc" className={checked ? 'checked' : ''}></Check>
        </Box>
        <div>{label}</div>
      </Container>
    );
  }
}
export default CheckBox;
