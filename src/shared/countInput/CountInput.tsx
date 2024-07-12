import { Component } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  CountButton,
  CountLabel,
  Input,
  Container,
  CountValue,
} from './CountInput.style';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  update(value: number): void;
}

interface State {}

class CountInput extends Component<Props, State> {
  decrease = () => {
    if (this.props.value === this.props.min) return;
    this.props.update(this.props.value - 1);
  };

  increase = () => {
    if (this.props.value === this.props.max) return;
    this.props.update(this.props.value + 1);
  };
  render() {
    const { label, value } = this.props;
    return (
      <Container>
        <CountLabel>{label}</CountLabel>
        <Input>
          <CountButton onClick={this.decrease}>
            <FaMinus></FaMinus>
          </CountButton>
          <CountValue>{value}</CountValue>
          <CountButton onClick={this.increase}>
            <FaPlus color="#4da7bc"></FaPlus>
          </CountButton>
        </Input>
      </Container>
    );
  }
}
export default CountInput;
