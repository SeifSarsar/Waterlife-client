import { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Bed } from '../../enums/Bed';
import Translator from '../translations/Translator';
import {
  Item,
  Row,
  Button,
  Container,
  Label,
  OptionButton,
  Options,
  ItemContainer,
  Option,
  OptionDelete,
} from './TagsInput.style';

interface Props {
  data: string[][];
  options: Map<string, string>;
  update?(data: string[][]): void;
  isStatic?: boolean;
}

interface State {}

class TagsInput extends Component<Props, State> {
  addItem = (rowIndex: number) => {
    const data = [...this.props.data];
    data[rowIndex].push(Bed.Single);
    if (this.props.update) this.props.update(data);
  };

  updateItem = (rowIndex: number, itemIndex: number, item: string) => {
    const data = [...this.props.data];
    data[rowIndex][itemIndex] = item;
    if (this.props.update) this.props.update(data);
  };

  removeItem = (bedroomIndex: number, bedIndex: number) => {
    const data = [...this.props.data];

    const bedroom = data[bedroomIndex];
    bedroom.splice(bedIndex, 1);

    if (bedroom.length === 0) data.splice(bedroomIndex, 1);

    if (this.props.update) this.props.update(data);
  };

  onMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const bedItemContainer = event.currentTarget;
    bedItemContainer.classList.add('active');
  };

  onMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    const bedItemContainer = event.currentTarget;
    bedItemContainer.classList.remove('active');
  };

  render() {
    const { data, options, isStatic } = this.props;
    return (
      <>
        {data.map((row: string[], rowIndex: number) => (
          <Container key={rowIndex}>
            <Label>{rowIndex + 1}</Label>

            <Row>
              {row.map((item: string, itemIndex: number) => (
                <ItemContainer
                  key={itemIndex}
                  onMouseOver={isStatic ? () => {} : this.onMouseOver}
                  onMouseOut={isStatic ? () => {} : this.onMouseOut}
                >
                  <Item>
                    {!isStatic && <OptionButton></OptionButton>}
                    <span>{options.get(item)}</span>
                  </Item>
                  {!isStatic && (
                    <Options>
                      {Array.from(options.entries()).map((option, index) => (
                        <Option
                          key={index}
                          onClick={() => {
                            this.updateItem(rowIndex, itemIndex, option[0]);
                          }}
                          className={item === option[0] ? 'selected' : ''}
                        >
                          {option[1]}
                        </Option>
                      ))}
                      <OptionDelete
                        onClick={() => {
                          this.removeItem(rowIndex, itemIndex);
                        }}
                      >
                        {Translator.getPropertyListText().delete}
                      </OptionDelete>
                    </Options>
                  )}
                </ItemContainer>
              ))}
              {!isStatic && (
                <Button onClick={() => this.addItem(rowIndex)}>
                  <FaPlus></FaPlus>
                </Button>
              )}
            </Row>
          </Container>
        ))}
      </>
    );
  }
}
export default TagsInput;
