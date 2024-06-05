import { Component, ChangeEvent } from 'react';
import {
  Note,
  PriceContainer,
  PriceInput,
  PriceLabel,
  PriceRate,
} from './PriceForm.style';
import {
  FormTitle,
  FieldTitle,
} from '../../../pages/createProduct/CreateProduct.style';
import { Category } from '../../../enums/Category';
import Translator from '../../translations/Translator';
import { Product } from '../../../models/Product';
import { InputError } from '../../inputs/Inputs.style';

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {}

class PriceForm extends Component<Props, State> {
  readonly minPrice = 5;
  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    const { price } = product;
    this.props.update(product, price >= this.minPrice);
  };

  renderPriceLabel = (category: Category) => {
    const text = Translator.getCreateProductText().descriptionForm;
    switch (category) {
      case Category.Home:
        return text.night;
      case Category.Boat:
      case Category.SmallBoat:
      case Category.Waterfront:
        return text.hour;
    }
  };

  formatPrice(raw: string) {
    return raw === '' ? NaN : Number(Number(raw).toFixed(2));
  }
  onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      price: this.formatPrice(event.target.value),
    });
  };

  onSafeDepositChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      safeDepositAmount: this.formatPrice(event.target.value),
    });
  };

  render() {
    const { category, price, safeDepositAmount } = this.props.product;
    const { isEdit } = this.props;
    const text = Translator.getCreateProductText().descriptionForm;
    return (
      <>
        {!isEdit && <FormTitle>Price</FormTitle>}
        <FieldTitle>{text.price}</FieldTitle>
        <PriceContainer className={price < this.minPrice ? 'invalid' : ''}>
          <PriceLabel>$</PriceLabel>
          <PriceInput
            type="number"
            placeholder="Price"
            value={Number.isNaN(price) ? '' : price}
            onChange={this.onPriceChange}
          />
          <PriceRate>{this.renderPriceLabel(category)}</PriceRate>
        </PriceContainer>
        {price < this.minPrice && <InputError>{text.priceerror}</InputError>}

        <FieldTitle>{text.safedeposit}</FieldTitle>
        <PriceContainer>
          <PriceLabel>$</PriceLabel>
          <PriceInput
            type="number"
            placeholder="Amount"
            value={Number.isNaN(safeDepositAmount) ? '' : safeDepositAmount}
            onChange={this.onSafeDepositChange}
          />
        </PriceContainer>
        <Note>{text.safedepositnote}</Note>
      </>
    );
  }
}

export default PriceForm;
