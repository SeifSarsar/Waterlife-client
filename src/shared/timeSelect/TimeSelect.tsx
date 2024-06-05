import { ChangeEvent, Component } from 'react';
import Translator from '../translations/Translator';
import { Container, Select } from './TimeSelect.style';

interface Props {
  value: number;
  label: string;
  max: number;
  min: number;
  update(value: number): void;
}

interface State {}

class TimeSelect extends Component<Props, State> {
  update = (event: ChangeEvent<HTMLSelectElement>) => {
    this.props.update(parseInt(event.currentTarget.value));
  };
  renderSelectOptions = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{`${i}:00`}</option>);
    }
    return options;
  };

  render() {
    const { label, value, min, max } = this.props;
    return (
      <Container>
        <div>{label}</div>
        <Select
          className={value === -1 ? 'invalid' : ''}
          onChange={this.update}
          value={value}
        >
          <option value="-1" disabled>
            {Translator.getCreateProductText().calendarForm.time}
          </option>
          {this.renderSelectOptions(min, max)}
        </Select>
      </Container>
    );
  }
}
export default TimeSelect;
