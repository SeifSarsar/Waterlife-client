import { FaHome, FaShip, FaUmbrellaBeach } from 'react-icons/fa';
import React, { Fragment } from 'react';
import { Component } from 'react';
import { Category } from '../../../enums/Category';
import {
  FilterButton,
  FilterButtonTitle,
  FilterWindow,
} from '../../../shared/Filter.style';
import Radio from '../../../shared/radio/Radio';
import Translator from '../../../shared/translations/Translator';
import { GiPaddles } from 'react-icons/gi';

interface Props {
  active: boolean;
  value: Category;
  setCategory(category: Category): void;
  toggleWindow(): void;
}

interface State {}

class CategoryFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.container = React.createRef<HTMLDivElement>();
  }

  container: React.RefObject<HTMLDivElement>;

  onClick() {}

  render() {
    const { toggleWindow, active, value, setCategory } = this.props;
    const text = Translator.getProductsText();
    const categoryText = text.category;

    return (
      <Fragment>
        <FilterButton onClick={toggleWindow}>
          {value === Category.None && <FaHome color="#4da7bc" />}
          {value === Category.Home && <FaHome color="#4da7bc" />}
          {value === Category.Boat && <FaShip color="#4da7bc" />}
          {value === Category.SmallBoat && <GiPaddles color="#4da7bc" />}

          {value === Category.Waterfront && <FaUmbrellaBeach color="#4da7bc" />}

          <FilterButtonTitle>
            {value === Category.None && categoryText.none}
            {value === Category.Home && categoryText.houses}
            {value === Category.Boat && categoryText.boats}
            {value === Category.SmallBoat && categoryText.smallboats}
            {value === Category.Waterfront && categoryText.waterside}
          </FilterButtonTitle>
        </FilterButton>
        <FilterWindow className={active ? 'active' : ''}>
          <Radio
            checked={value === Category.None}
            label={categoryText.none}
            action={() => setCategory(Category.None)}
          ></Radio>
          <Radio
            checked={value === Category.Home}
            label={categoryText.houses}
            action={() => setCategory(Category.Home)}
          ></Radio>
          <Radio
            checked={value === Category.Boat}
            label={categoryText.boats}
            action={() => setCategory(Category.Boat)}
          ></Radio>
          <Radio
            checked={value === Category.SmallBoat}
            label={categoryText.smallboats}
            action={() => setCategory(Category.SmallBoat)}
          ></Radio>
          <Radio
            checked={value === Category.Waterfront}
            label={categoryText.waterside}
            action={() => setCategory(Category.Waterfront)}
          ></Radio>
        </FilterWindow>
      </Fragment>
    );
  }
}
export default CategoryFilter;
