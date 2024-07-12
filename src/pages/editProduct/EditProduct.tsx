import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { FormatProductForDBUpdate, Product } from '../../models/Product';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buttons, DescriptionButton, Form } from './EditProduct.style';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AddressForm from '../../shared/components/addressForm/AddressForm';
import DescriptionForm from '../../shared/components/descriptionForm/DescriptionForm';
import IntroductionForm from '../../shared/components/introductionForm/IntroductionForm';
import PictureForm from '../../shared/components/pictureForm/PictureForm';
import TimeForm from '../../shared/components/timeForm/TimeForm';
import Translator from '../../shared/translations/Translator';
import AxiosHandler from '../../shared/AxiosHandler';
import { withRouter } from 'react-router-dom';
import PriceForm from '../../shared/components/priceForm/PriceForm';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../shared/buttons/Buttons.style';

interface Props extends RouteComponentProps {}

interface State {
  product: Product;
  showIntroduction: boolean;
  showDescription: boolean;
  showTime: boolean;
  showLocation: boolean;
  showPictures: boolean;
  showPrice: boolean;
  isValid: boolean;
}

class EditProduct extends Component<Props, State> {
  params = this.props.match.params;
  productId: string = (this.params as any)?.id;
  constructor(props: Props) {
    super(props);
    this.state = {
      product: new Product(),
      showIntroduction: false,
      showDescription: false,
      showTime: false,
      showPrice: false,
      showLocation: false,
      showPictures: false,
      isValid: false,
    };
    this.setShowIntroduction = this.setShowIntroduction.bind(this);
    this.setShowDescription = this.setShowDescription.bind(this);
    this.setShowTime = this.setShowTime.bind(this);
    this.setShowLocation = this.setShowLocation.bind(this);
    this.setShowPictures = this.setShowPictures.bind(this);
    this.fetchProductDescription = this.fetchProductDescription.bind(this);
  }

  componentDidMount() {
    this.fetchProductDescription();
  }

  setProduct(product: Product) {
    product.rules = new Set(product.rules);
    product.amenities = new Set(product.amenities);
    for (let i = 0; i < product.unavailableDays.length; i++) {
      product.unavailableDays[i] = new Date(product.unavailableDays[i]);
    }

    this.setState(() => ({
      product,
    }));
  }

  setShowIntroduction(showIntroduction: boolean) {
    this.setState(() => ({
      showIntroduction,
    }));
  }

  setShowDescription(showDescription: boolean) {
    this.setState(() => ({
      showDescription,
    }));
  }

  setShowTime(showTime: boolean) {
    this.setState(() => ({
      showTime,
    }));
  }

  setShowLocation(showLocation: boolean) {
    this.setState(() => ({
      showLocation,
    }));
  }

  setShowPictures(showPictures: boolean) {
    this.setState(() => ({
      showPictures,
    }));
  }

  setShowPrice(showPrice: boolean) {
    this.setState(() => ({
      showPrice,
    }));
  }

  update = (product: Product, isValid: boolean) => {
    //AddressForm
    this.setState({
      product,
      isValid: isValid,
    });
  };

  fetchProductDescription() {
    AxiosHandler.get('/get/productdescription', {
      params: {
        id: this.productId,
      },
    })
      .then((res) => {
        if (res) {
          this.setProduct(res.data);
        }
      })
      .catch(() => {});
  }

  edit() {
    this.setState({ isValid: false });
    AxiosHandler.put(
      `/update/product/${this.state.product._id}`,
      FormatProductForDBUpdate(this.state.product)
    )
      .then(() =>
        this.props.history.push({
          pathname: `/products/${this.productId}`,
        })
      )
      .catch(() => {
        this.setState({ isValid: true });
      });
  }

  cancel() {
    this.props.history.push({
      pathname: `/products/${this.productId}`,
    });
  }

  render() {
    const {
      product,
      showIntroduction,
      showDescription,
      showLocation,
      showPictures,
      showTime,
      showPrice,
    } = this.state;

    if (product._id === '') {
      return null;
    }
    const text = Translator.getEditProductText();

    return (
      <Form>
        {showIntroduction ? (
          <DescriptionButton
            onClick={() => this.setShowIntroduction(!showIntroduction)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            Introduction
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton
            onClick={() => this.setShowIntroduction(!showIntroduction)}
          >
            Introduction
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showIntroduction && (
          <IntroductionForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></IntroductionForm>
        )}

        {showDescription ? (
          <DescriptionButton
            onClick={() => this.setShowDescription(!showDescription)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            Description
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton
            onClick={() => this.setShowDescription(!showDescription)}
          >
            Description
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showDescription && (
          <DescriptionForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></DescriptionForm>
        )}

        {showPrice ? (
          <DescriptionButton
            onClick={() => this.setShowPrice(!showPrice)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            Price
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton onClick={() => this.setShowPrice(!showPrice)}>
            Price
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showPrice && (
          <PriceForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></PriceForm>
        )}
        {showLocation ? (
          <DescriptionButton
            onClick={() => this.setShowLocation(!showLocation)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            {text.location}
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton
            onClick={() => this.setShowLocation(!showLocation)}
          >
            {text.location}
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showLocation && (
          <AddressForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></AddressForm>
        )}
        {showTime ? (
          <DescriptionButton
            onClick={() => this.setShowTime(!showTime)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            {text.availabilities}
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton onClick={() => this.setShowTime(!showTime)}>
            {text.availabilities}
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showTime && (
          <TimeForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></TimeForm>
        )}

        {showPictures ? (
          <DescriptionButton
            onClick={() => this.setShowPictures(!showPictures)}
            style={{ backgroundColor: '#4DA7BC', color: 'white' }}
          >
            {text.pictures}
            <FaChevronUp
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronUp>
          </DescriptionButton>
        ) : (
          <DescriptionButton
            onClick={() => this.setShowPictures(!showPictures)}
          >
            {text.pictures}
            <FaChevronDown
              style={{ position: 'relative', top: '15px' }}
            ></FaChevronDown>
          </DescriptionButton>
        )}
        {showPictures && (
          <PictureForm
            product={product}
            update={(product: Product, isValid: boolean) => {
              this.update(product, isValid);
            }}
            isEdit={true}
          ></PictureForm>
        )}
        <Buttons>
          <SecondaryButton onClick={() => this.cancel()}>
            {text.cancel}
          </SecondaryButton>
          <PrimaryButton
            onClick={() => this.edit()}
            className={this.state.isValid ? '' : 'disabled'}
          >
            {text.edit}
          </PrimaryButton>
        </Buttons>
      </Form>
    );
  }
}

export default withRouter(EditProduct);
