import { Component, Fragment } from "react";
import { InputSection } from "./TypeForm.style";
import {
  FormTitle,
  FieldTitle,
} from "../../../pages/createProduct/CreateProduct.style";
import Radio from "../../radio/Radio";
import { Category } from "../../../enums/Category";

import Translator from "../../translations/Translator";
import {
  Type,
  BoatType,
  HomeType,
  SmallBoatType,
  TypeToString,
  NoneType,
} from "../../../enums/Type";
import { Product } from "../../../models/Product";
import { Captain } from "../../../enums/Captain";

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {}

class TypeForm extends Component<Props, State> {
  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    const { category, type } = product;
    if (category === Category.SmallBoat) {
      product.nBedrooms = 0;
      product.nWashrooms = 0;
      product.bedrooms = [];
      product.amenities = new Set();
      product.rules = new Set();
    } else if (category === Category.Waterfront) {
      product.nBedrooms = 0;
    }
    this.props.update(product, this.isNext(category, type));
  };

  isNext = (category: Category, type: Type) => {
    if (category === Category.None) return false;

    if (category === Category.Waterfront) return true;

    return type !== NoneType.None;
  };

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
    const { product, isEdit } = this.props;

    const { category, type } = product;

    const text = Translator.getCreateProductText();
    const productText = Translator.getProductsText();
    return (
      <Fragment>
        {!isEdit && <FormTitle>Type</FormTitle>}
        <FieldTitle>{text.typeForm.category}</FieldTitle>
        <InputSection>
          <Radio
            checked={category === Category.Home}
            label={productText.category.houses}
            action={() =>
              this.update({
                ...product,
                category: Category.Home,
                type: NoneType.None,
                captain: Captain.None,
                isElectricMotor: false,
              })
            }
          ></Radio>
          <Radio
            checked={category === Category.Boat}
            label={productText.category.boats}
            action={() =>
              this.update({
                ...product,
                category: Category.Boat,
                type: NoneType.None,
              })
            }
          ></Radio>
          <Radio
            checked={category === Category.SmallBoat}
            label={productText.category.smallboats}
            action={() =>
              this.update({
                ...product,
                category: Category.SmallBoat,
                type: NoneType.None,
              })
            }
          ></Radio>
          <Radio
            checked={category === Category.Waterfront}
            label={productText.category.waterside}
            action={() =>
              this.update({
                ...product,
                category: Category.Waterfront,
                type: NoneType.None,
              })
            }
          ></Radio>
        </InputSection>
        {category !== Category.None && category !== Category.Waterfront && (
          <>
            <FieldTitle>{text.typeForm.type}</FieldTitle>
            <InputSection>
              {this.getTypes(category).map((value, index) => (
                <Radio
                  key={index}
                  checked={type === value}
                  label={TypeToString(category, value)}
                  action={() =>
                    this.update({ ...product, category, type: value })
                  }
                ></Radio>
              ))}
            </InputSection>
          </>
        )}
        <div></div>
      </Fragment>
    );
  }
}

export default TypeForm;
