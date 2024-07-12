import { Component } from 'react';
import { Flex, RuleContainer, RuleLabel, Icon } from './DescriptionForm.style';
import {
  FormTitle,
  FieldTitle,
} from '../../../pages/createProduct/CreateProduct.style';
import { FaDog, FaVolumeUp, FaSmoking } from 'react-icons/fa';
import { Bed, BedToString } from '../../../enums/Bed';

import CheckBox from '../../checkbox/CheckBox';
import CountInput from '../../countInput/CountInput';
import { Category } from '../../../enums/Category';
import Radio from '../../radio/Radio';
import { Captain } from '../../../enums/Captain';
import Translator from '../../translations/Translator';
import { Product } from '../../../models/Product';
import TagsInput from '../../tagsInput/TagsInput';
import { Rule, RuleToString } from '../../../enums/Rule';
import {
  Amenity,
  BoatAmenity,
  BoatAmenityToString,
  HomeAmenity,
  HomeAmenityToString,
  WaterfrontAmenity,
  WaterfrontAmenityToString,
} from '../../../enums/Amenity';

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {}

class DescriptionForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.bedOptions = new Map(
      Object.entries(Bed).map((value: [string, Bed]) => {
        return [value[1], BedToString(value[1])];
      })
    );
  }

  bedOptions: Map<string, string>;

  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    const { category, captain } = product;
    this.props.update(product, this.isNext(category, captain));
  };

  isNext = (category: Category, captain: Captain) => {
    if (category !== Category.Boat) return true;
    return captain !== Captain.None;
  };

  updateBedroomCount(count: number) {
    const previousCount = this.props.product.bedrooms.length;

    if (count > previousCount) this.addBedroom(count);
    else this.removeBedroom(count);
  }

  addBedroom = (count: number) => {
    const bedrooms = [...this.props.product.bedrooms];
    bedrooms.push([Bed.Single]);
    this.update({
      ...this.props.product,
      bedrooms,
      nBedrooms: count,
    });
  };

  removeBedroom = (count: number) => {
    if (this.props.product.bedrooms.length === 0) return;

    const bedrooms = [...this.props.product.bedrooms];
    bedrooms.pop();
    this.update({
      ...this.props.product,
      bedrooms,
      nBedrooms: count,
    });
  };

  toggleRule(rule: Rule) {
    const rules = new Set(this.props.product.rules);

    if (rules.has(rule)) rules.delete(rule);
    else rules.add(rule);
    this.update({
      ...this.props.product,
      rules,
    });
  }

  toggleAmenity = (amenity: Amenity) => {
    const amenities = new Set(this.props.product.amenities);

    if (amenities.has(amenity)) amenities.delete(amenity);
    else amenities.add(amenity);

    this.update({
      ...this.props.product,
      amenities,
    });
  };

  render() {
    const { product, isEdit } = this.props;

    const text = Translator.getCreateProductText().featuresForm;
    return (
      <>
        {!isEdit && <FormTitle>Description</FormTitle>}
        <FieldTitle>{text.guests}</FieldTitle>
        <CountInput
          label={text.gueststitle}
          value={product.nGuests}
          min={1}
          max={20}
          update={(nGuests: number) => this.update({ ...product, nGuests })}
        ></CountInput>
        {product.category !== Category.SmallBoat && (
          <CountInput
            label={text.washrooms}
            value={product.nWashrooms}
            min={0}
            max={10}
            update={(nWashrooms: number) =>
              this.update({ ...product, nWashrooms })
            }
          ></CountInput>
        )}
        {(product.category === Category.Home ||
          product.category === Category.Boat) && (
          <CountInput
            label={text.bedrooms}
            value={product.bedrooms.length}
            min={0}
            max={10}
            update={(bedrooms: number) => this.updateBedroomCount(bedrooms)}
          ></CountInput>
        )}

        <TagsInput
          data={product.bedrooms}
          options={this.bedOptions}
          update={(bedrooms: Bed[][]) => this.update({ ...product, bedrooms })}
        ></TagsInput>
        {product.category !== Category.SmallBoat && (
          <>
            <FieldTitle>{text.rules}</FieldTitle>
            {Object.entries(Rule).map((value, index) => (
              <RuleContainer
                key={index}
                style={{
                  justifyContent: isEdit ? 'flex-start' : 'space-between',
                  gap: '10px',
                }}
              >
                <RuleLabel>
                  <Icon>
                    {value[1] === Rule.Party && <FaVolumeUp />}
                    {value[1] === Rule.Smoking && <FaSmoking />}
                    {value[1] === Rule.Pet && <FaDog />}
                  </Icon>
                  <span>{RuleToString(value[1])}</span>
                </RuleLabel>
                <CheckBox
                  checked={product.rules.has(value[1])}
                  label=""
                  action={() => this.toggleRule(value[1])}
                ></CheckBox>
              </RuleContainer>
            ))}
          </>
        )}
        {product.category === Category.Boat && (
          <>
            <FieldTitle>{text.motor}</FieldTitle>
            <Flex>
              <Radio
                checked={!product.isElectricMotor}
                label={text.no}
                action={() =>
                  this.update({
                    ...this.props.product,
                    isElectricMotor: false,
                  })
                }
              ></Radio>
              <Radio
                checked={product.isElectricMotor}
                label={text.yes}
                action={() =>
                  this.update({
                    ...this.props.product,
                    isElectricMotor: true,
                  })
                }
              ></Radio>
            </Flex>
            <FieldTitle>{text.captain}</FieldTitle>
            <Flex>
              <Radio
                checked={product.captain === Captain.Never}
                label={text.never}
                action={() =>
                  this.update({
                    ...this.props.product,
                    captain: Captain.Never,
                  })
                }
              ></Radio>
              <Radio
                checked={product.captain === Captain.Optional}
                label={text.optional}
                action={() =>
                  this.update({
                    ...this.props.product,
                    captain: Captain.Optional,
                  })
                }
              ></Radio>
              <Radio
                checked={product.captain === Captain.Always}
                label={text.always}
                action={() =>
                  this.update({
                    ...this.props.product,
                    captain: Captain.Always,
                  })
                }
              ></Radio>
            </Flex>
          </>
        )}

        {product.category === Category.Home && (
          <>
            <FieldTitle>{text.ameneties}</FieldTitle>
            {Object.entries(HomeAmenity).map(
              (amenity: [string, HomeAmenity], index: number) => (
                <CheckBox
                  key={index}
                  checked={product.amenities.has(amenity[1])}
                  label={HomeAmenityToString(amenity[1])}
                  action={() => this.toggleAmenity(amenity[1])}
                ></CheckBox>
              )
            )}
          </>
        )}
        {product.category === Category.Boat && (
          <>
            <FieldTitle>{text.ameneties}</FieldTitle>
            {Object.entries(BoatAmenity).map(
              (amenity: [string, BoatAmenity], index: number) => (
                <CheckBox
                  key={index}
                  checked={product.amenities.has(amenity[1])}
                  label={BoatAmenityToString(amenity[1])}
                  action={() => this.toggleAmenity(amenity[1])}
                ></CheckBox>
              )
            )}
          </>
        )}
        {product.category === Category.Waterfront && (
          <>
            <FieldTitle>{text.ameneties}</FieldTitle>
            {Object.entries(WaterfrontAmenity).map(
              (amenity: [string, WaterfrontAmenity], index: number) => (
                <CheckBox
                  key={index}
                  checked={product.amenities.has(amenity[1])}
                  label={WaterfrontAmenityToString(amenity[1])}
                  action={() => this.toggleAmenity(amenity[1])}
                ></CheckBox>
              )
            )}
          </>
        )}
      </>
    );
  }
}

export default DescriptionForm;
