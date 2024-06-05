import { Component, Fragment } from 'react';
import {
  ClearFilter,
  FilterButton,
  FilterButtonTitle,
  FilterWindow,
} from '../../../shared/Filter.style';
import { FaChevronDown } from 'react-icons/fa';
import CheckBox from '../../../shared/checkbox/CheckBox';
import { Category } from '../../../enums/Category';
import Translator from '../../../shared/translations/Translator';
import {
  BoatType,
  HomeType,
  NoneType,
  SmallBoatType,
  Type,
  TypeToString,
} from '../../../enums/Type';

interface Props {
  active: boolean;
  category: Category;
  types: Set<string>;
  setTypes(value: Type): void;
  toggleWindow(): void;
}

interface State {}

class TypeFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.props.setTypes(NoneType.None);
  }

  getTypes(category: Category) {
    if (category === Category.Home) {
      return Object.entries(HomeType).map(
        (value: [string, HomeType]) => value[1]
      );
    } else if (category === Category.Boat) {
      return Object.entries(BoatType).map(
        (value: [string, BoatType]) => value[1]
      );
    } else if (category === Category.SmallBoat) {
      return Object.entries(SmallBoatType).map(
        (value: [string, SmallBoatType]) => value[1]
      );
    }

    return [];
  }

  render() {
    const { toggleWindow, active, category, types, setTypes } = this.props;
    const text = Translator.getProductsText();

    return (
      <Fragment>
        <FilterButton onClick={toggleWindow}>
          <FaChevronDown color="#4da7bc" />
          <FilterButtonTitle>Types</FilterButtonTitle>
        </FilterButton>
        <FilterWindow className={active ? 'active' : ''}>
          {category !== Category.None &&
            this.getTypes(category).map((value, index) => (
              <CheckBox
                key={index}
                checked={types.has(value)}
                label={TypeToString(category, value)}
                action={() => setTypes(value)}
              ></CheckBox>
            ))}
          <ClearFilter onClick={this.clear}> {text.clear} </ClearFilter>
        </FilterWindow>
      </Fragment>
    );
  }
}
export default TypeFilter;
