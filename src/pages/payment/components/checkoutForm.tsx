import { useState, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../../../contexts/AuthContext';
import Translator from '../../../shared/translations/Translator';
import {
  ErrorText,
  InputBox,
  PaymentBox,
  PaymentButton,
} from './checkoutForm.style';
import { Routes } from '../../../enums/Routes';
import AxiosHandler from '../../../shared/AxiosHandler';
import { RangeModifier } from 'react-day-picker';
import { DayBooking } from '../../../models/DayBooking';
import { Product } from '../../../models/Product';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../shared/buttons/Buttons.style';
import { GetStripeKey } from '../../../shared/EnvHandler';

interface Props extends RouteComponentProps {
  product: Product;
  totalPrice: number;
  stayPrice: number;
  taxes: number;
  govTaxes: number;
  provTaxes: number;
  lodgingTaxes: number;
  charges: number;
  dayBooking: DayBooking | null;
  date: RangeModifier;
}

loadStripe(GetStripeKey(), {
  locale: 'en',
  stripeAccount: 'acct_1JuUgOLK1wfv8R2K',
});

const CheckoutForm = (props: Props) => {
  const text = Translator.getPaymentText();
  const stripe = useStripe();
  const element = useElements();
  const [check, setCheck] = useState(false);
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(false);
  const [postal, setPostal] = useState('');
  const [name, setName] = useState('');

  const authContext = useContext(AuthContext);

  const createPaymentMethod = async () => {
    if (!stripe || !element) return null;

    const card = element.getElement(CardNumberElement);

    if (card == null) {
      return;
    }

    const paymentMethodResult = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (paymentMethodResult.error) {
      setCheck(true);
      setError(paymentMethodResult.error.message!);
      return null;
    }
    return paymentMethodResult.paymentMethod.id;
  };

  const getHostServiceFees = (price: number) => {
    if (price < 500) return 0.05;
    if (price >= 500 && price < 2000) return 0.04;
    if (price >= 2000 && price < 3500) return 0.03;
    if (price >= 3500) return 0.02;

    return 0;
  };

  const startPayment = async (e: any) => {
    e.preventDefault();
    setDisable(true);

    const paymentMethodId = await createPaymentMethod();
    const safeDepositPaymentMethodId = await createPaymentMethod();

    const amount = Math.trunc(props.totalPrice * 100);

    const hostFee = props.stayPrice * getHostServiceFees(props.stayPrice);
    const fee = Math.trunc(100 * (props.charges + props.taxes + hostFee));

    AxiosHandler.post('/create/payment', {
      hostId: props.product.hostStripeId,
      paymentMethodId,
      safeDepositPaymentMethodId,
      customerEmail: authContext.user?.email,
      amount,
      fee,
      safeDepositAmount: Math.trunc(props.product.safeDepositAmount * 100),
      confirm: true,
    })
      .then(async (res) => {
        const { paymentId, safeDepositPaymentId } = res.data;

        createBooking(paymentId, safeDepositPaymentId);

        updateProductBookings();

        updateGovDue();
        props.history.push(Routes.SuccessPayment);
      })
      .catch((err) => {
        setCheck(true);
        setDisable(false);
      });
  };

  const sendMail = (paymentID: string) => {
    AxiosHandler.post('/send/mail', {
      type: 'payment',
      productid: props.product._id,
      paymentId: paymentID,
    });
  };

  const createBooking = (paymentId: string, safeDepositPaymentId: string) => {
    let payment: any = {
      userId: authContext.user?._id,
      productId: props.product._id,
      initialPrice: Number(props.stayPrice.toFixed(2)),
      govTaxes: Number(props.govTaxes.toFixed(2)),
      provTaxes: Number(props.provTaxes.toFixed(2)),
      lodgingTaxes: Number(props.lodgingTaxes.toFixed(2)),
      taxes: Number(props.taxes.toFixed(2)),
      charges: Number(props.charges.toFixed(2)),
      paymentId,
      state: props.product.address.state,
      isCanceled: false,
      safeDepositPaymentId,
      safeDepositAmount: Number(props.product.safeDepositAmount.toFixed(2)),
      isSafeDepositAccepted: false,
    };

    if (props.date.from && props.date.to) {
      payment = {
        ...payment,
        overnightBooking: {
          start: props.date.from,
          end: props.date.to,
        },
        from: props.date.from,
        to: props.date.to,
      };
    } else if (props.dayBooking) {
      payment = {
        ...payment,
        dayBooking: props.dayBooking,
        from: props.dayBooking.day,
        to: props.dayBooking.day,
      };
    }
    AxiosHandler.post('/create/booking', payment).then(async (res) => {
      sendMail(res.data._id);
    });
  };

  const updateProductBookings = () => {
    if (props.date.from && props.date.to) {
      AxiosHandler.put('/create/productbooking', {
        id: props.product._id,
        booking: props.product.overnightBooking.concat({
          start: props.date.from,
          end: props.date.to,
        }),
        type: 'overnight',
      });
    } else if (props.dayBooking) {
      if (isDayFull()) {
        let dayBooking = props.dayBooking;
        if (dayBooking) {
          let unavailableDays = props.product.unavailableDays;
          unavailableDays.push(dayBooking.day);
          let product = props.product;
          product.unavailableDays = unavailableDays;
          AxiosHandler.put(`/update/product/${props.product._id}`, {
            unavailableDays,
          });
        }
      }

      AxiosHandler.put('/create/productbooking', {
        id: props.product._id,
        booking: props.product.dayBooking.concat(props.dayBooking),
        type: 'day',
      });
    }
  };

  const isDayFull = () => {
    let sameDayBooking: Array<number> = [];
    props.product.dayBooking.forEach((booking) => {
      if (props.dayBooking) {
        let bookingDate = props.dayBooking.day.toISOString();
        if (String(booking.day) === bookingDate) {
          sameDayBooking.push(booking.start);
          sameDayBooking.push(booking.end);
        }
      }
    });

    if (props.dayBooking) {
      sameDayBooking.push(props.dayBooking.start);
      sameDayBooking.push(props.dayBooking.end);
    }
    sameDayBooking.sort((a, b) => (a > b ? 1 : -1));

    let isDayFull = true;
    let lastEndHour: number = 0;
    sameDayBooking.forEach((hour, index) => {
      if (index === 0) {
        if (hour !== props.product.availableStart) isDayFull = false;
      } else if (index === sameDayBooking.length - 1) {
        if (hour !== props.product.availableEnd) isDayFull = false;
      } else if (index % 2 !== 0) {
        lastEndHour = hour;
      } else if (index % 2 === 0 && hour !== lastEndHour + 1) {
        isDayFull = false;
      }
      index = index + 1;
    });

    return isDayFull;
  };

  const updateGovDue = () => {
    let fixedgov = props.govTaxes.toFixed(2);
    const govDue = {
      state: 'FED',
      amount: fixedgov,
    };
    AxiosHandler.put('/create/govdue', govDue);

    let fixedProv = props.provTaxes.toFixed(2);
    const provDue = {
      state: props.product.address.state,
      amount: fixedProv,
    };
    AxiosHandler.put('/create/govdue', provDue);

    const hostFee = props.stayPrice * getHostServiceFees(props.stayPrice);
    let don = (props.charges + hostFee) * 0.03;
    let fixedDon = don.toFixed(2);

    const donDue = {
      state: 'DON',
      amount: fixedDon,
    };
    AxiosHandler.put('/create/govdue', donDue);

    let lodging = props.lodgingTaxes;
    let fixedLodging = lodging.toFixed(2);
    let field = 'lodging ' + props.product.address.state;
    const lodgingDue = {
      state: field,
      amount: fixedLodging,
    };
    AxiosHandler.put('/create/govdue', lodgingDue);
  };

  const onCancel = () => {
    props.history.push({
      pathname: Routes.Products + '/' + props.product._id,
    });
  };

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: '45px',
        fontSize: '18px',
        color: '#070708',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={startPayment}>
      <label htmlFor="name">Full Name</label>
      <InputBox
        id="name"
        required
        placeholder="John Doe"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label htmlFor="cardNumber">Card Number</label>
      <PaymentBox>
        <CardNumberElement options={ELEMENT_OPTIONS} />
      </PaymentBox>
      <label htmlFor="expiry">Card Expiration</label>
      <PaymentBox>
        <CardExpiryElement id="expiry" options={ELEMENT_OPTIONS} />
      </PaymentBox>
      <label htmlFor="cvc">CVC</label>
      <PaymentBox>
        <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
      </PaymentBox>
      <label htmlFor="postal">Postal Code</label>
      <InputBox
        id="postal"
        required
        placeholder="12345"
        value={postal}
        maxLength={6}
        onChange={(event) => {
          setPostal(event.target.value);
        }}
      />

      {check && <ErrorText> {error} </ErrorText>}

      <PaymentButton>
        <SecondaryButton onClick={onCancel}>{text.cancel}</SecondaryButton>
        <PrimaryButton
          onClick={startPayment}
          className={!disable ? '' : 'disabled'}
        >
          {!disable ? text.pay : text.process}
        </PrimaryButton>
      </PaymentButton>
    </form>
  );
};

export default withRouter(CheckoutForm);
