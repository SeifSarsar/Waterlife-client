import { AxiosRequestConfig } from 'axios';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { HistoricRentals } from '../../models/HistoricRentals';
import { Payments } from '../../models/Payment';
import { Product } from '../../models/Product';
import { User } from '../../models/User';
import AxiosHandler from '../../shared/AxiosHandler';
import NoResult from '../../shared/noResult/NoResult';
import Translator from '../../shared/translations/Translator';
import HistoricForm from './HistoricForm';
import { Container, List, Title } from './Histotic.style';

interface Props extends RouteComponentProps {}

interface State {
  paymentHistoric: Payments[];
  actualRentals: HistoricRentals[];
  historicRentals: HistoricRentals[];
  firstCall: Boolean;
}

class Historic extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      paymentHistoric: [],
      actualRentals: [],
      historicRentals: [],
      firstCall: false,
    };
  }

  componentDidMount() {
    this.getPaymentHistory();
  }

  getPaymentHistory = () => {
    this.setState({ firstCall: true });
    const config: AxiosRequestConfig = {
      params: {
        id: this.context.user?._id,
      },
    };

    AxiosHandler.get('/get/historic', config)
      .then((res) => {
        if (res) {
          const payment: Payments[] = res.data;
          this.setState({ paymentHistoric: payment });
          this.getProductHistoric();
        }
      })
      .catch(() => {});
  };

  getProductDescription = (payment: Payments) => {
    if (!payment.isCanceled) {
      let product: Product = new Product();
      let user: User = new User();
      let rental: HistoricRentals;
      let historic: HistoricRentals[];
      const config: AxiosRequestConfig = {
        params: {
          id: payment.productId,
        },
      };

      AxiosHandler.get(`/get/productdescription`, config).then((res) => {
        if (res) {
          product = res.data;
          let newDate = new Date();
          let datePayement = new Date(payment.to);
          const userConfig: AxiosRequestConfig = {
            params: {
              id: product.userId,
            },
          };
          AxiosHandler.get(`/get/userById`, userConfig)
            .then((res) => {
              if (res) {
                user = res.data;
                rental = {
                  product: product,
                  actual: this.verifyActual(datePayement, newDate),
                  overnightBooking: payment.overnightBooking
                    ? {
                        start: new Date(payment.overnightBooking.start),
                        end: new Date(payment.overnightBooking.end),
                      }
                    : null,
                  dayBooking: payment.dayBooking
                    ? {
                        day: new Date(payment.dayBooking.day),
                        start: payment.dayBooking.start,
                        end: payment.dayBooking.end,
                      }
                    : null,
                  paymentId: payment._id,
                  email: user.email,
                  phone: user.phoneNumber,
                  from: payment.from,
                };

                if (rental.actual) {
                  historic = this.state.actualRentals;
                  historic.push(rental);
                  this.setState({
                    actualRentals: historic,
                  });
                  this.sortActual();
                } else {
                  historic = this.state.historicRentals;
                  historic.push(rental);
                  this.setState({
                    historicRentals: historic,
                  });
                  this.sortPassed();
                }
              }
            })
            .catch((error) => {});
        }
      });
    }
  };

  verifyActual = (locationDate: Date, today: Date): Boolean => {
    if (locationDate.getTime() < today.getTime()) {
      return false;
    } else {
      return true;
    }
  };

  getProductHistoric = () => {
    let payment: Payments;
    for (let i = 0; i < this.state.paymentHistoric.length; i++) {
      payment = this.state.paymentHistoric[i];
      this.getProductDescription(payment);
    }
    this.sortActual();
  };

  sortActual = () => {
    let list: HistoricRentals[] = [];
    let templist = this.state.actualRentals;
    while (templist.length !== 0) {
      let index = 0;
      let min = new Date(templist[0].from);
      for (let i = 0; i < templist.length; i++) {
        let date = new Date(templist[i].from);
        if (date.getTime() < min.getTime()) {
          index = i;
          min = date;
        }
      }
      list.push(templist[index]);
      templist.splice(index, 1);
    }
    this.setState({ actualRentals: list });
  };

  sortPassed = () => {
    let list: HistoricRentals[] = [];
    let templist = this.state.historicRentals;
    while (templist.length !== 0) {
      let index = 0;
      let max = new Date(templist[0].from);
      for (let i = 0; i < templist.length; i++) {
        let date = new Date(templist[i].from);
        if (date.getTime() > max.getTime()) {
          index = i;
          max = date;
        }
      }
      list.push(templist[index]);
      templist.splice(index, 1);
    }
    this.setState({ historicRentals: list });
  };

  render() {
    const { historicRentals, actualRentals } = this.state;
    const text = Translator.getHistoricText();
    return (
      <Container>
        <List>
          <Title>{text.current} </Title>
          {actualRentals.length === 0 ? (
            <NoResult message={text.unfound}></NoResult>
          ) : (
            actualRentals.map((rental: HistoricRentals, index: number) => (
              <HistoricForm
                key={index}
                rental={rental}
                isActualRental={true}
              ></HistoricForm>
            ))
          )}

          <Title>{text.title} </Title>

          {historicRentals.length === 0 ? (
            <NoResult message={text.noproperty}></NoResult>
          ) : (
            historicRentals.map((rental: HistoricRentals, index: number) => (
              <HistoricForm
                key={index}
                rental={rental}
                isActualRental={false}
              ></HistoricForm>
            ))
          )}
        </List>
      </Container>
    );
  }
}

export default withRouter(Historic);
