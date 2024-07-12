import { Component, Fragment } from 'react';
import IntroductionForm from '../../shared/components/introductionForm/IntroductionForm';
import DescriptionForm from '../../shared/components/descriptionForm/DescriptionForm';
import PictureForm from '../../shared/components/pictureForm/PictureForm';
import TypeForm from '../../shared/components/typeForm/TypeForm';
import {
  Container,
  ActionsContainer,
  Left,
  Right,
  Form,
  Illustration,
  ProgressBar,
  Progress,
} from './CreateProduct.style';
import AddressForm from '../../shared/components/addressForm/AddressForm';
import TimeForm from '../../shared/components/timeForm/TimeForm';
import { FormatProductForDBCreate, Product } from '../../models/Product';
import { storage } from '../../FireBaseApp';
import {
  getDownloadURL,
  ref,
  StringFormat,
  UploadResult,
  uploadString,
} from 'firebase/storage';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Translator from '../../shared/translations/Translator';
import AxiosHandler from '../../shared/AxiosHandler';
import PriceForm from '../../shared/components/priceForm/PriceForm';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../shared/buttons/Buttons.style';
import { Routes } from '../../enums/Routes';

interface Props extends RouteComponentProps {}

interface State {
  step: number;
  isNext: boolean[];
  product: Product;
  processing: boolean;
  error: string;
}

class CreateProduct extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>

  state: State = {
    step: 0,
    isNext: [],
    product: new Product(),
    processing: false,
    error: '',
  };

  componentDidMount() {
    if(this.context.user === null) {
      this.props.history.push({
        pathname: Routes.SignIn,
      });
    } else if(this.context.user.stripeId === undefined) {
      this.props.history.push({
        pathname: Routes.BecomeHost,
      });
    }
  }

  getForms(product: Product) {
    return [
      <TypeForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 0);
        }}
        isEdit={false}
      ></TypeForm>,
      <IntroductionForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 1);
        }}
        isEdit={false}
      ></IntroductionForm>,
      <PictureForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 2);
        }}
        isEdit={false}
      ></PictureForm>,
      <DescriptionForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 3);
        }}
        isEdit={false}
      ></DescriptionForm>,
      <PriceForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 4);
        }}
        isEdit={false}
      ></PriceForm>,
      <TimeForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 5);
        }}
        isEdit={false}
      ></TimeForm>,
      <AddressForm
        product={product}
        update={(product: Product, isAction: boolean) => {
          this.update(product, isAction, 6);
        }}
        isEdit={false}
      ></AddressForm>,
    ];
  }

  update = (product: Product, isNext: boolean, index: number) => {
    const newIsNext = [...this.state.isNext];
    newIsNext[index] = isNext;
    //AddressForm
    this.setState({
      product,
      isNext: newIsNext,
    });
  };

  back = () => {
    this.setState((state: State) => ({ step: state.step - 1 }));
  };

  next = () => {
    if (this.state.isNext[this.state.step]) {
      this.setState((state: State) => ({ step: state.step + 1 }));
    }
  };

  create = async () => {
    this.setState({ processing: true });
    const user = this.context.user;

    if (!user) return;
    AxiosHandler.post(
      '/create/product',
      FormatProductForDBCreate({
        ...this.state.product,
        userId: user._id,
        hostStripeId: user.stripeId,
      })
    )
      .then((res) => {
        //Save images in firebase storage and update product images field
        const product = res.data as Product;

        const uploadPromises: Promise<UploadResult>[] = [];

        this.state.product.images.forEach((image: string, index: number) => {
          const reference = ref(storage, `/products/${product._id}/${index}`);
          uploadPromises.push(
            uploadString(reference, image, StringFormat.DATA_URL)
          );
        });

        Promise.all(uploadPromises).then((results: UploadResult[]) => {
          const downloadPromises: Promise<string>[] = [];

          results.forEach((result: UploadResult) => {
            downloadPromises.push(getDownloadURL(result.ref));
          });

          Promise.all(downloadPromises).then((images: string[]) => {
            AxiosHandler.put(`/update/product/${product._id}`, {
              images,
            })
              .then(() => {
                //Go to product description page
                this.props.history.push({
                  pathname: `/products/${product._id}`,
                });
              })
              .catch((error) => {
                this.setState({ processing: false });
                this.setState({ error: error });
              });
          });
        });
      })
      .catch((error) => {
        this.setState({ processing: false });
        this.setState({ error: error });
      });
  };

  render() {
    const { isNext, product, step, processing, error } = this.state;

    const forms = this.getForms(product);

    const text = Translator.getCreateProductText();

    return (
      <Fragment>
        <ProgressBar>
          <Progress
            width={Math.round(((step + 1) / forms.length) * 100)}
          ></Progress>
        </ProgressBar>
        <Container>
          <Left>
            <Form>{forms[step]}</Form>

            <ActionsContainer>
              <SecondaryButton
                onClick={this.back}
                className={step <= 0 ? 'disabled' : ''}
              >
                {text.back}
              </SecondaryButton>
              {this.state.step < forms.length - 1 && (
                <PrimaryButton
                  onClick={this.next}
                  className={isNext[step] === true ? '' : 'disabled'}
                >
                  {text.next}
                </PrimaryButton>
              )}
              {this.state.step === forms.length - 1 && (
                <>
                  <PrimaryButton
                    onClick={this.create}
                    className={
                      isNext[step] === true && !processing ? '' : 'disabled'
                    }
                  >
                    {text.create}
                  </PrimaryButton>
                  <div>{error}</div>
                </>
              )}
            </ActionsContainer>
          </Left>
          <Right>
            {this.state.step === 0 && (
              <Illustration src="/images/createProduct/typeForm.svg"></Illustration>
            )}
            {this.state.step === 1 && (
              <Illustration src="/images/createProduct/introductionForm.svg"></Illustration>
            )}
            {this.state.step === 2 && (
              <Illustration src="/images/createProduct/pictureForm.svg"></Illustration>
            )}
            {this.state.step === 3 && (
              <Illustration src="/images/createProduct/descriptionForm.svg"></Illustration>
            )}
            {this.state.step === 4 && (
              <Illustration src="/images/createProduct/priceForm.svg"></Illustration>
            )}
            {this.state.step === 5 && (
              <Illustration src="/images/createProduct/timeForm.svg"></Illustration>
            )}
            {this.state.step === 6 && (
              <Illustration src="/images/createProduct/addressForm.svg"></Illustration>
            )}
          </Right>
        </Container>
      </Fragment>
    );
  }
}

export default withRouter(CreateProduct);
