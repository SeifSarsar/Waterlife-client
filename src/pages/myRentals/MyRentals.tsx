import { Component } from 'react';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../contexts/AuthContext';
import { Product } from '../../models/Product';
import AxiosHandler from '../../shared/AxiosHandler';
import { PrimaryButton } from '../../shared/buttons/Buttons.style';
import HostContract from '../../shared/components/hostContract/HostContract';
import Translator from '../../shared/translations/Translator';
import {
  Container,
  Title,
  TitleContainer,
  TextLink,
  List,
} from './MyRentals.style';
import NoResult from '../../shared/noResult/NoResult';
import RentalForm from './rentalForm';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

interface State {
  products: any;
  showContract: boolean;
}

class MyRentals extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],
      showContract: false,
    };

    this.setProducts = this.setProducts.bind(this);
    this.setContract = this.setContract.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.context.user) {
      AxiosHandler.get(`/get/rentals`, {
        params: {
          id: this.context.user._id,
        },
      })
        .then((res) => {
          if (res) {
            this.setProducts(res.data);
          }
        })
        .catch(() => {});
    }
  }

  remove(id: string) {
    AxiosHandler.delete(`/delete/product`, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        if (res) {
          this.fetchData();
        }
      })
      .catch(() => {});
  }

  setProducts(products: any) {
    this.setState(() => ({
      products: products,
    }));
  }

  setContract(state: boolean) {
    this.setState(() => ({
      showContract: state,
    }));
  }

  render() {
    const { showContract, products } = this.state;
    const text = Translator.getPropertyListText();

    return (
      <Container>
        {!showContract && (
          <>
            <TitleContainer>
              <Title>{text.title}</Title>
              <TextLink
                onClick={() => {
                  this.setContract(true);
                }}
              >
                {text.contract}
              </TextLink>
            </TitleContainer>
            <List>
              {products.length === 0 ? (
                <NoResult message={text.noproperties}></NoResult>
              ) : (
                products.map((product: Product, index: number) => (
                  <RentalForm
                    key={index}
                    product={product}
                    remove={(id: string) => {
                      this.remove(id);
                    }}
                  ></RentalForm>
                ))
              )}
            </List>
          </>
        )}

        {showContract && (
          <>
            <Title>{text.contractTitle}</Title>
            <HostContract />
            <PrimaryButton
              onClick={() => {
                this.setContract(false);
                window.scrollTo(0, 0);
              }}
              width="40%"
            >
              {text.button}
            </PrimaryButton>
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(MyRentals);
