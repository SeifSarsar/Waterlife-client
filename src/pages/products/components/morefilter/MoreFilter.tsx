import { Component } from 'react';
import { Label, Slider, PriceContainer, Price } from './MoreFilter.style';
import React from 'react';
import {
  ClearFilter,
  FilterButton,
  FilterButtonTitle,
  RightFilterWindow,
} from '../../../../shared/Filter.style';
import ReverseCheckBox from '../../../../shared/checkbox/ReverseCheckBox';
import { FaSlidersH } from 'react-icons/fa';
import Translator from '../../../../shared/translations/Translator';
import CountInput from '../../../../shared/countInput/CountInput';

interface Props {
  active: boolean;
  guests: number;
  bedrooms: number;
  price: number[];
  minPrice: number;
  maxPrice: number;
  mobilityFriendly: boolean;
  setPrice(value: number[]): void;
  setMoreFilters(guests: number, bedrooms: number): void;
  toggleWindow(): void;
  setMobilityFriendly(): void;
}

interface State {}

class MoreFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.container = React.createRef<HTMLDivElement>();
  }
  container: React.RefObject<HTMLDivElement>;

  clear() {
    this.props.setMoreFilters(0, 0);
    this.props.setPrice([this.props.minPrice, this.props.maxPrice]);
  }

  render() {
    const {
      active,
      guests,
      bedrooms,
      price,
      minPrice,
      maxPrice,
      setPrice,
      setMoreFilters,
      setMobilityFriendly,
      toggleWindow,
      mobilityFriendly,
    } = this.props;

    const text = Translator.getProductsText();
    const moreFiltersText = text.morefilters;

    return (
      <>
        <FilterButton onClick={toggleWindow}>
          <FaSlidersH color="#4da7bc" />
          <FilterButtonTitle> {moreFiltersText.morefilters} </FilterButtonTitle>
        </FilterButton>
        <RightFilterWindow className={active ? 'active' : ''}>
          <CountInput
            label={moreFiltersText.guests}
            value={guests}
            min={0}
            max={20}
            update={(value: number) => setMoreFilters(value, bedrooms)}
          ></CountInput>
          <CountInput
            label={moreFiltersText.bedroom}
            value={bedrooms}
            min={0}
            max={10}
            update={(value: number) => setMoreFilters(guests, value)}
          ></CountInput>

          <ReverseCheckBox
            key={'mobilityFriendly'}
            checked={mobilityFriendly}
            label={moreFiltersText.reducedmobility}
            action={setMobilityFriendly}
          ></ReverseCheckBox>

          <Label> {moreFiltersText.price} </Label>
          <PriceContainer>
            <Price>${price[0] > minPrice ? price[0] : minPrice}</Price>
            <Price>${price[1] < maxPrice ? price[1] : maxPrice}</Price>
          </PriceContainer>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={10}
            allowCross={false}
            defaultValue={[minPrice, maxPrice]}
            onChange={setPrice}
            value={price}
          />
          <ClearFilter onClick={this.clear}> {text.clear} </ClearFilter>
        </RightFilterWindow>
      </>
    );
  }
}
export default MoreFilter;
