import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "reactjs-popup/dist/index.css";
import Translator from "../../shared/translations/Translator";
import {
  RefundButton,
  ReturnButton,
  ButtonContainer,
  RefundTitle,
  RefundPage,
  TextBox,
} from "./OwnerRefund.style";
import { Routes } from "../../enums/Routes";
import { Payments } from "../../models/Payment";
import { Link } from "react-router-dom";
import AxiosHandler from "../../shared/AxiosHandler";
import { Product } from "../../models/Product";

const test = new Date();

const Refund = (props: any) => {
  const text = Translator.getRefund();

  const params = props.match.params;
  const productId: string = (params as any)?.id;

  const [paymentI, setPaymentI] = useState("");
  const [payment, setPayment] = useState<Payments>({
    _id: "",
    userId: "",
    productId: "",
    initialPrice: 0,
    govTaxes: 0,
    provTaxes: 0,
    lodgingTaxes: 0,
    taxes: 0,
    charges: 0,
    paymentId: "",
    state: "",
    from: test,
    to: test,
    isCanceled: false,
    overnightBooking: null,
    dayBooking: null,
    safeDepositAmount: 0,
    safeDepositPaymentId: "",
    isSafeDepositAccepted: false,
  });

  const [product, setProduct] = useState(new Product());

  useEffect(() => {
    AxiosHandler.get(`/get/paymentIntent`, {
      params: {
        id: productId,
      },
    })
      .then((res: any) => {
        if (res) {
          const payment: Payments = res.data;
          setPaymentI(payment.paymentId.toString());
          setPayment(payment);
          AxiosHandler.get(`/get/productdescription`, {
            params: {
              id: res.data.productId,
            },
          })
            .then((res: any) => {
              if (res) {
                setProduct(res.data);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, [productId]);
  // getBdPayment();

  const sendMail = () => {
    AxiosHandler.post("/send/mail", {
      type: "owner refund",
      productid: product,
      paymentId: payment.userId,
    });
  };

  const getHostServiceFees = (price: number) => {
    if (price < 500) return 0.05;
    if (price >= 500 && price < 2000) return 0.04;
    if (price >= 2000 && price < 3500) return 0.03;
    if (price >= 3500) return 0.02;

    return 0;
  };

  const RefundStay = (idIntent: String) => {
    AxiosHandler.post("/create/refund", {
      id: idIntent,
    })
      .then((res: any) => {
        if (res) {
          props.history.push(Routes.SuccessRefund);
          sendMail();
          let minusGovDue = payment.govTaxes * -1;
          let minusProvDue = payment.provTaxes * -1;
          const hostFee =
            payment.initialPrice * getHostServiceFees(payment.initialPrice);
          let don = (payment.charges + hostFee) * 0.03;
          let minusDon = don * -1;
          let lodgingField = "lodging " + product.address.state;
          let minusLodging = payment.lodgingTaxes * -1;

          const lodgingSent = {
            state: lodgingField,
            amount: minusLodging,
          };
          AxiosHandler.put("/create/govdue", lodgingSent);

          const donSent = {
            state: "DON",
            amount: minusDon,
          };
          AxiosHandler.put("/create/govdue", donSent);

          const provDueSent = {
            state: product.address.state,
            amount: minusProvDue,
          };
          AxiosHandler.put("/create/govdue", provDueSent);

          const govDueSent = {
            state: "FED",
            amount: minusGovDue,
          };
          AxiosHandler.put("/create/govdue", govDueSent);

          const paymentId = {
            id: productId,
          };
          AxiosHandler.put("/cancel/payment", paymentId);
        }
      })
      .catch(() => {});

    props.history.push(Routes.SuccessRefund);

    //annuler booking
    if (payment.overnightBooking !== null) {
      let productOvernightBooking = product.overnightBooking;
      for (let i = 0; i < product.overnightBooking.length; i++) {
        let startDatePayment = new Date(payment.overnightBooking.start);
        let startDateProduct = new Date(product.overnightBooking[i].start);
        let endDatePayment = new Date(payment.overnightBooking.end);
        let endDateProduct = new Date(product.overnightBooking[i].end);
        if (startDatePayment.getTime() === startDateProduct.getTime()) {
          if (endDatePayment.getTime() === endDateProduct.getTime()) {
            productOvernightBooking.splice(i, 1);
          }
        }
      }
      let bookingSent = {
        id: product._id,
        booking: productOvernightBooking,
        type: "overnight",
      };
      AxiosHandler.put("/create/productbooking", bookingSent);
    } else if (payment.dayBooking !== null) {
      let productDayBooking = product.dayBooking;
      for (let i = 0; i < product.dayBooking.length; i++) {
        let dayPayment = new Date(payment.dayBooking.day);
        let dayProduct = new Date(product.dayBooking[i].day);
        if (dayPayment.getTime() === dayProduct.getTime()) {
          if (payment.dayBooking.end === product.dayBooking[i].end) {
            if (payment.dayBooking.start === product.dayBooking[i].start) {
              productDayBooking.splice(i, 1);
            }
          }
        }
      }
      let bookingSent = {
        id: product._id,
        booking: productDayBooking,
        type: "day",
      };
      AxiosHandler.put("/create/productbooking", bookingSent);
    }
  };

  return (
    <RefundPage>
      <RefundTitle>{text.title}</RefundTitle>
      <TextBox>{text.messageRefund}</TextBox>
      <ButtonContainer>
        <Link to={Routes.MyRentals} style={{ textDecoration: "none" }}>
          <ReturnButton> {text.button}</ReturnButton>
        </Link>
        <RefundButton onClick={() => RefundStay(paymentI)}>
          {text.cancel}
        </RefundButton>
      </ButtonContainer>
    </RefundPage>
  );
};

export default withRouter(Refund);
