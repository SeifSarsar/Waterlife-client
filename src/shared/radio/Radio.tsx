import { Component } from 'react';
import { Container, RadioButton, Circle } from './Radio.style';

interface Props {
  checked: boolean;
  label: string;
  action(): void;
}

interface State {}

class Radio extends Component<Props, State> {
  render() {
    const { label, checked } = this.props;
    return (
      <Container onClick={this.props.action}>
        <RadioButton className={checked ? 'checked' : ''}>
          <Circle className={checked ? 'checked' : ''}></Circle>
        </RadioButton>
        <div>{label}</div>
      </Container>
    );
  }
}
export default Radio;
