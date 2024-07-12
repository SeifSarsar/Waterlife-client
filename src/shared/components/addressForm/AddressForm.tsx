import { ChangeEvent, Component } from 'react';
import Address from '../../../models/Address';
import { Product } from '../../../models/Product';
import {
  FormTitle,
  FieldTitle,
} from '../../../pages/createProduct/CreateProduct.style';
import { Flex, AddressInput, Verify } from './AddressForm.style';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../map/MapMarker';
import { Map } from './AddressForm.style';
import Translator from '../../translations/Translator';
import { InputError } from '../../inputs/Inputs.style';

interface Props {
  product: Product;
  isEdit: boolean;
  update(product: Product, isAction: boolean): void;
}

interface State {
  verified: boolean;
}

class AddressForm extends Component<Props, State> {
  geocoder = new google.maps.Geocoder();

  state: State = {
    verified: false,
  };

  componentDidMount() {
    this.update(this.props.product);
  }

  update = (product: Product) => {
    this.props.update(product, this.state.verified);
  };

  isValidAddress = (address: Address) => {
    return (
      address.street !== '' &&
      address.city !== '' &&
      address.state !== '' &&
      address.postalCode !== '' &&
      address.country !== ''
    );
  };

  setStreet = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      address: {
        ...this.props.product.address,
        street: event.currentTarget.value,
      },
    });
  };

  setCity = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      address: {
        ...this.props.product.address,
        city: event.currentTarget.value,
      },
    });
  };

  setAddressState = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      address: {
        ...this.props.product.address,
        state: event.currentTarget.value,
      },
    });
  };

  setPostalCode = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      address: {
        ...this.props.product.address,
        postalCode: event.currentTarget.value,
      },
    });
  };

  setCountry = (event: ChangeEvent<HTMLInputElement>) => {
    this.update({
      ...this.props.product,
      address: {
        ...this.props.product.address,
        country: event.currentTarget.value,
      },
    });
  };

  verify = () => {
    const { product } = this.props;
    const { street, city, state, postalCode, country } = product.address;

    let fullAddress = [street, city, state, postalCode, country].join(',');

    this.geocoder.geocode({ address: fullAddress }).then((result) => {
      const { results } = result;
      if (results.length > 0) {
        this.setState({ verified: true });
        this.update({
          ...product,
          address: {
            ...product.address,
            fullAddress: results[0].formatted_address,
          },
          location: {
            type: 'Point',
            coordinates: [
              results[0].geometry.location.lng(),
              results[0].geometry.location.lat(),
            ],
          },
        });
      }
    });
  };

  render() {
    const { category, address, location } = this.props.product;
    const { isEdit } = this.props;
    const { street, city, state, postalCode, country, fullAddress } = address;
    const text = Translator.getCreateProductText().positionForm;

    return (
      <>
        {!isEdit && <FormTitle>{text.address}</FormTitle>}
        <FieldTitle>{text.addressQuestion}</FieldTitle>
        <AddressInput
          type="text"
          className={street === '' ? 'invalid' : ''}
          width="100%"
          placeholder={text.street}
          value={street}
          onChange={this.setStreet}
        />

        <AddressInput
          type="text"
          className={city === '' ? 'invalid' : ''}
          width="100%"
          placeholder={text.city}
          value={city}
          onChange={this.setCity}
        />
        <Flex>
          <AddressInput
            type="text"
            className={state === '' ? 'invalid' : ''}
            width="49%"
            placeholder={text.state}
            value={state}
            onChange={this.setAddressState}
          />
          <AddressInput
            type="text"
            className={postalCode === '' ? 'invalid' : ''}
            width="49%"
            placeholder={text.code}
            value={postalCode}
            onChange={this.setPostalCode}
          />
        </Flex>
        <Flex>
          <AddressInput
            type="text"
            className={country === '' ? 'invalid' : ''}
            width="49%"
            placeholder={text.country}
            value={country}
            onChange={this.setCountry}
          />
          {this.isValidAddress(address) && (
            <Verify onClick={this.verify}>{text.verify}</Verify>
          )}
        </Flex>
        {!this.isValidAddress(address) && <InputError>{text.error}</InputError>}

        {fullAddress !== '' && (
          <>
            <FieldTitle>{text.confirm}</FieldTitle>
            <div>{fullAddress}</div>
            {location.coordinates[0] && location.coordinates[1] && category && (
              <Map>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyAISTnlb1x6zOX5PHw3IfMaOBdWwx40TcU',
                  }}
                  center={{
                    lat: location.coordinates[1],
                    lng: location.coordinates[0],
                  }}
                  defaultZoom={15}
                >
                  <MapMarker
                    lat={location.coordinates[1]}
                    lng={location.coordinates[0]}
                    category={category}
                  ></MapMarker>
                </GoogleMapReact>
              </Map>
            )}
          </>
        )}
      </>
    );
  }
}

export default AddressForm;
