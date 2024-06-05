import { Component } from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Product } from '../../models/Product';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/checkoutForm';
import Translator from '../../shared/translations/Translator';
import ConnectionRequired from '../../shared/components/connectionRequired/ConnectionRequired';
import { AuthContext } from '../../contexts/AuthContext';

import {
  ClientInfos,
  Field,
  FlexStayInfos,
  HalfTopPageProduct,
  HalfPage,
  HalfProductTopContainer,
  Icons,
  Image,
  OrderSummary,
  PaymentPage,
  PriceInfos,
  PriceStayInfos,
  ProductName,
  PageTitle,
  StayField,
  StayInfo,
  DateHourTrip,
  PriceContainer,
  PricesContainer,
  FlexPayInfo,
} from './Payment.style';
import { RangeModifier } from 'react-day-picker';
import AxiosHandler from '../../shared/AxiosHandler';
import { Category } from '../../enums/Category';
import { DayBooking } from '../../models/DayBooking';
import { GetProvTax, GetFedTax, GetLodgingTax } from '../../utils/Taxes';
import { Province } from '../../enums/Province';
import ModalDialog from '../../shared/modal/Modal';
import { GetStripeKey } from '../../shared/EnvHandler';

const NavigationLinkStyle = {
  textDecoration: 'none',
};

interface Props extends RouteComponentProps {}

const stripePromise = loadStripe(GetStripeKey(), { locale: 'auto' });

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

interface State {
  map: boolean;
  product: Product;
  timeStayed: number;
  stayPrice: number;
  total: number;
  totalTaxes: number;
  charges: number;
  date: RangeModifier;
  isProcessing: boolean;
  setProcessingTo: boolean;
  govTax: number;
  provTax: number;
  lodgingTax: number;
  govTaxRate: number;
  provTaxRate: number;
  lodgingTaxRate: number;
  isConnected: boolean;
  secondPage: boolean;
  dayBooking: DayBooking | null;
  dateAlreadyBooking: boolean;
}

class Payment extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  params = this.props.match.params;
  productId: string = (this.params as any)?.id;

  constructor(props: Props & RouteComponentProps) {
    super(props);

    this.state = {
      map: false,
      product: new Product(),
      timeStayed: 0,
      stayPrice: 0,
      govTax: 0,
      provTax: 0,
      lodgingTax: 0,
      govTaxRate: 0,
      provTaxRate: 0,
      lodgingTaxRate: 0,
      total: 0,
      totalTaxes: 0,
      charges: 0,
      date: this.getDates(),
      isProcessing: false,
      setProcessingTo: false,
      isConnected: false,
      secondPage: false,
      dayBooking: this.getHours(),
      dateAlreadyBooking: false,
    };

    this.setPrices = this.setPrices.bind(this);
    this.fetchProductDescription = this.fetchProductDescription.bind(this);
  }

  getDates = (): RangeModifier => {
    const searchParam = new URLSearchParams(this.props.location.search);
    if (searchParam.has('day'))
      return {
        from: null,
        to: null,
      };
    let from = searchParam.get('from');
    if (from) {
      from = from?.replaceAll('-', '/')!;
    }
    let to = searchParam.get('to');
    if (to) {
      to = to?.replaceAll('-', '/')!;
    }

    return {
      from: from ? new Date(from) : null,
      to: to ? new Date(to) : null,
    };
  };

  getCategory = () => {
    const searchParam = new URLSearchParams(this.props.location.search);
    let category = searchParam.get('category');
    return category;
  };

  getHours = () => {
    const searchParam = new URLSearchParams(this.props.location.search);
    if (!searchParam.has('day')) return null;

    let day = searchParam.get('day');
    if (day) {
      day = day?.replaceAll('-', '/')!;
    }
    let start = searchParam.get('from');
    if (start) {
      start = start?.replaceAll('-', '/')!;
    }
    let end = searchParam.get('to');
    if (end) {
      end = end?.replaceAll('-', '/')!;
    }

    return {
      day: day ? new Date(day) : new Date(0),
      start: start ? parseInt(start) : 0,
      end: end ? parseInt(end) : 0,
    };
  };

  componentDidMount() {
    this.fetchProductDescription();
  }

  fetchProductDescription() {
    AxiosHandler.get(`/get/productdescription`, {
      params: {
        id: this.productId,
      },
    })
      .then((res) => {
        if (res) {
          const product = res.data as Product;
          this.setState(
            {
              product: product,
              provTaxRate: GetProvTax(product.address.state),
              govTaxRate: GetFedTax(product.address.state),
              lodgingTaxRate:
                product.category === Category.Home
                  ? GetLodgingTax(
                      product.address.state as Province,
                      this.getDaysdiff(this.state.date)
                    )
                  : 0,
            },
            () => {
              this.setPrices();
            }
          );
          if (!this.verifyDaysBooking()) {
            this.setState({ dateAlreadyBooking: true });
          }
        }
      })
      .catch(() => {});
  }

  compareDates = (date1: Date, date2: Date): Boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  verifyDaysBooking = (): Boolean => {
    if (
      this.state.date.from !== null &&
      this.state.date.to !== null &&
      this.state.date.from !== undefined &&
      this.state.date.to !== undefined
    ) {
      let startDate = this.state.date.from;
      let date = new Date(startDate);
      let endDate = this.state.date.to;
      let j = 0;
      while (date.getTime() < endDate.getTime()) {
        if (this.state.product.overnightBooking !== null) {
          for (let i = 0; i < this.state.product.overnightBooking.length; i++) {
            let dateFrom = new Date(
              this.state.product.overnightBooking[i].start
            );
            let dateTo = new Date(this.state.product.overnightBooking[i].end);
            if (
              date.getTime() > dateFrom.getTime() &&
              date.getTime() < dateTo.getTime()
            ) {
              return false;
            } else if (this.compareDates(date, dateFrom)) {
              return false;
            } else if (this.compareDates(date, dateTo)) {
              return false;
            }
          }
        } else {
          for (let i = 0; i < this.state.product.unavailableDays.length; i++) {
            let dateFrom = new Date(this.state.product.unavailableDays[i]);
            let dateTo = new Date(this.state.product.unavailableDays[i]);
            if (
              date.getTime() > dateFrom.getTime() &&
              date.getTime() < dateTo.getTime()
            ) {
              return false;
            } else if (this.compareDates(date, dateFrom)) {
              return false;
            } else if (this.compareDates(date, dateTo)) {
              return false;
            }
          }
        }
        j++;
        date.setDate(startDate.getDate() + j);
      }
    }
    return true;
  };

  getDaysdiff(date: RangeModifier) {
    if (!date.to || !date.from) return 0;
    const timeDiff = date.to.getTime() - date.from.getTime();
    return Math.round(timeDiff / (1000 * 3600 * 24));
  }
  getHoursDiff(booking: DayBooking) {
    return booking.end - booking.start;
  }
  setPrices() {
    let diffInTime: number = 0;
    if (this.state.dayBooking) {
      diffInTime = this.getHoursDiff(this.state.dayBooking);
    } else {
      diffInTime = this.getDaysdiff(this.state.date);
    }

    const basePrice = this.state.product.price * diffInTime;

    const charges = basePrice * this.getServiceFees(basePrice);
    const govTax = (basePrice + charges) * this.state.govTaxRate;

    const provTax = (basePrice + charges) * this.state.provTaxRate;

    const lodgingTax = (basePrice + charges) * this.state.lodgingTaxRate;

    const taxes = govTax + provTax + lodgingTax;
    const total = basePrice + taxes + charges;
    this.setState({
      stayPrice: basePrice,
      govTax,
      provTax,
      totalTaxes: taxes,
      total,
      charges,
      lodgingTax,
      timeStayed: diffInTime,
    });
  }

  getServiceFees(price: number) {
    if (price < 500) return 0.2;
    if (price >= 500 && price < 2000) return 0.15;
    if (price >= 2000 && price < 3500) return 0.12;
    if (price >= 3500) return 0.05;

    return 0;
  }

  closePaymentPage = () => {};
  render() {
    const text = Translator.getPaymentText();
    const isConnected = this.context.user !== null;
    return (
      <div className="container-center-horizontal">
        <PaymentPage>
          <HalfPage>
            <ClientInfos>
              {!isConnected && <ConnectionRequired setIsConnected={() => {}} />}

              {isConnected && (
                <>
                  <PageTitle>{text.payment}</PageTitle>
                  <Field>
                    {text.acceptedpayments}
                    <Icons>
                      <img
                        src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                        alt="Carte Visa"
                        height="9"
                        aria-hidden="true"
                      />
                      <img
                        src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                        alt="Mastercard"
                        height="9"
                        aria-hidden="true"
                      ></img>
                      <img
                        src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
                        alt="Carte American Express"
                        height="9"
                        aria-hidden="true"
                      ></img>
                    </Icons>
                  </Field>

                  <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                    <CheckoutForm
                      product={this.state.product}
                      totalPrice={this.state.total}
                      stayPrice={this.state.stayPrice}
                      date={this.state.date}
                      taxes={this.state.totalTaxes}
                      govTaxes={this.state.govTax}
                      provTaxes={this.state.provTax}
                      lodgingTaxes={this.state.lodgingTax}
                      charges={this.state.charges}
                      dayBooking={this.state.dayBooking}
                    />
                  </Elements>
                </>
              )}
            </ClientInfos>
          </HalfPage>

          <OrderSummary>
            <HalfTopPageProduct>
              <HalfProductTopContainer>
                <Image
                  src={this.state.product.images[this.state.product.thumbnail]}
                ></Image>
              </HalfProductTopContainer>
              <HalfProductTopContainer>
                <ProductName>{this.state.product.title}</ProductName>
                <StayField>{text.guests}</StayField>
                <StayInfo>
                  {this.state.product.nGuests + ' ' + text.persons}
                </StayInfo>
                <FlexStayInfos>
                  <HalfProductTopContainer>
                    <DateHourTrip>
                      {this.state.dayBooking &&
                        `${this.state.dayBooking.day.toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}`}
                    </DateHourTrip>
                    <StayField>{text.begin}</StayField>
                    <StayInfo>
                      <AiTwotoneCalendar />
                      {this.state.dayBooking
                        ? this.state.dayBooking.start + ':00'
                        : this.state.date.from &&
                          `${this.state.date.from.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}`}
                    </StayInfo>
                  </HalfProductTopContainer>
                  <HalfProductTopContainer>
                    <StayField
                      style={{
                        marginTop:
                          this.state.product.category === Category.Home
                            ? '0px'
                            : '20.5px',
                      }}
                    >
                      {text.end}
                    </StayField>
                    <StayInfo>
                      <AiTwotoneCalendar />
                      {this.state.dayBooking
                        ? this.state.dayBooking.end + ':00'
                        : this.state.date.to &&
                          `${this.state.date.to.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}`}
                    </StayInfo>
                  </HalfProductTopContainer>
                </FlexStayInfos>
                <StayField>{text.place}</StayField>
                <StayInfo>
                  <GiPositionMarker />
                  {this.state.product.address.fullAddress.replace(/,/g, ', ')}
                </StayInfo>
              </HalfProductTopContainer>
            </HalfTopPageProduct>

            <div>
              <hr />
            </div>

            <FlexPayInfo>
              <PricesContainer>
                <PriceInfos>{text.totalprice}</PriceInfos>
                <PriceContainer>
                  <PriceStayInfos>
                    {this.state.product.price + (this.state.dayBooking ? text.pph : text.ppn)}
                  </PriceStayInfos>
                  <PriceStayInfos>x</PriceStayInfos>
                  <PriceStayInfos>
                    {this.state.product.category === Category.Home
                      ? this.state.timeStayed
                      : this.state.timeStayed + 'h'}
                  </PriceStayInfos>
                  <PriceStayInfos>=</PriceStayInfos>
                  <PriceStayInfos>
                    {this.state.stayPrice.toFixed(2)}$
                  </PriceStayInfos>
                </PriceContainer>
              </PricesContainer>

              <PricesContainer>
                <PriceInfos>{text.servicefees}</PriceInfos>
                <PriceStayInfos>
                  {this.state.charges.toFixed(2)}$
                </PriceStayInfos>
              </PricesContainer>

              <PricesContainer>
                <PriceInfos>{text.taxes}</PriceInfos>
                <PriceStayInfos>
                  {this.state.totalTaxes.toFixed(2)}$
                </PriceStayInfos>
              </PricesContainer>
            </FlexPayInfo>

            <div>
              <hr />
            </div>

            <FlexStayInfos>
              <HalfProductTopContainer>
                <PriceInfos>Total</PriceInfos>
                <PriceInfos>{text.security}</PriceInfos>
              </HalfProductTopContainer>
              <HalfProductTopContainer>
                <PriceStayInfos>
                  {this.state.total.toFixed(2)}$ CAD
                </PriceStayInfos>
                <PriceStayInfos>
                  {this.state.product.safeDepositAmount}$ CAD
                </PriceStayInfos>
              </HalfProductTopContainer>
            </FlexStayInfos>
          </OrderSummary>
        </PaymentPage>
        <Link to={`/products/${this.productId}`} style={NavigationLinkStyle}>
          <ModalDialog
            show={this.state.dateAlreadyBooking}
            handleClose={() => this.closePaymentPage()}
            title={text.dateerror}
            secondaryBtn={false}
            primaryBtnText={'OK'}
            onConfirm={() => this.closePaymentPage()}
          />
        </Link>
      </div>
    );
  }
}

export default withRouter(Payment);
