import { AxiosRequestConfig } from "axios";
import { RouteComponentProps } from "react-router";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Payments } from "../../models/Payment";
import { ListBooking } from "../../models/ListBooking";
import { User } from "../../models/User";
import AxiosHandler from "../../shared/AxiosHandler";
import NoResult from "../../shared/noResult/NoResult";
import BookingForm from "./BookingForm";
import { Container, List, NavContainer, Title } from "./Booking.style";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../shared/buttons/Buttons.style";
import Translator from "../../shared/translations/Translator";

interface Props extends RouteComponentProps {
  title: string;
  photo: string;
}

interface State {
  listBooking: ListBooking[];
  listBookingPass: ListBooking[];
  tempListBooking: ListBooking[];
  isPass: boolean;
}

class Booking extends Component<Props, State> {
  params = this.props.match.params;
  productId: string = (this.params as any)?.id;
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      listBooking: [],
      listBookingPass: [],
      tempListBooking: [],
      isPass: false,
    };
  }

  componentDidMount() {
    this.getBooking();
  }

  getBooking = () => {
    let payement: Payments[];
    const config: AxiosRequestConfig = {
      params: {
        productId: this.productId,
      },
    };
    AxiosHandler.get(`/get/booking`, config)
      .then((res) => {
        if (res) {
          payement = res.data;
          this.getUser(payement);
        }
      })
      .catch((error) => {});
  };

  getUser = (listPayment: Payments[]) => {
    for (let i = 0; i < listPayment.length; i++) {
      const userConfig: AxiosRequestConfig = {
        params: {
          id: listPayment[i].userId,
        },
      };
      AxiosHandler.get(`/get/userById`, userConfig).then((res) => {
        if (res) {
          const user: User = res.data;
          let booking: ListBooking = {
            payment: listPayment[i],
            user: user,
            isPassed: false,
          };
          this.setState({
            tempListBooking: this.state.tempListBooking.concat(booking),
          });
          if (this.state.tempListBooking.length === listPayment.length) {
            this.setListBooking();
          }
        }
      });
    }
  };

  setListBooking = () => {
    let today = new Date();
    let booking: ListBooking;
    let list: ListBooking[] = [];
    for (let i = 0; i < this.state.tempListBooking.length; i++) {
      let date = new Date(this.state.tempListBooking[i].payment.to);
      if (!this.firstMoreActual(date, today)) {
        booking = this.state.tempListBooking[i];
        booking.isPassed = true;
        let passList = this.state.listBookingPass;
        passList.push(booking);
        this.setState({ listBookingPass: passList });
      } else {
        if (!this.state.tempListBooking[i].payment.isCanceled) {
          booking = this.state.tempListBooking[i];
          list.push(booking);
        }
      }
    }
    this.setState({ listBooking: list });
    this.sort();
    this.sortPassed();
  };

  sort = () => {
    let list: ListBooking[] = [];
    let templist = this.state.listBooking;
    while (templist.length !== 0) {
      let index = 0;
      let min = new Date(templist[0].payment.from);
      for (let i = 0; i < templist.length; i++) {
        let date = new Date(templist[i].payment.from);
        if (date.getTime() < min.getTime()) {
          index = i;
          min = date;
        }
      }
      list.push(templist[index]);
      templist.splice(index, 1);
    }
    this.setState({ listBooking: list });
  };

  sortPassed = () => {
    let list: ListBooking[] = [];
    let templist = this.state.listBookingPass;
    while (templist.length !== 0) {
      let index = 0;
      let max = new Date(templist[0].payment.from);
      for (let i = 0; i < templist.length; i++) {
        let date = new Date(templist[i].payment.from);
        if (date.getTime() > max.getTime()) {
          index = i;
          max = date;
        }
      }
      list.push(templist[index]);
      templist.splice(index, 1);
    }
    this.setState({ listBookingPass: list });
  };

  firstMoreActual = (firstDate: Date, secondDate: Date): Boolean => {
    if (firstDate.getTime() > secondDate.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  changeIsPass = () => {
    this.setState({ isPass: !this.state.isPass });
  };

  render() {
    const text = Translator.getBookingText();
    const { listBooking, listBookingPass, isPass } = this.state;
    return (
      <Container>
        <NavContainer>
          {!isPass ? (
            <>
              <PrimaryButton>{text.coming}</PrimaryButton>
              <SecondaryButton onClick={this.changeIsPass}>
                {text.pass}
              </SecondaryButton>
            </>
          ) : (
            <>
              <SecondaryButton onClick={this.changeIsPass}>
                {text.coming}
              </SecondaryButton>
              <PrimaryButton>{text.pass}</PrimaryButton>
            </>
          )}
        </NavContainer>

        {!isPass ? (
          <List>
            <Title>{text.booking} </Title>
            {listBooking.length === 0 ? (
              <NoResult message={text.unfoundCurrent}></NoResult>
            ) : (
              listBooking.map((booking: ListBooking, index: number) => (
                <BookingForm
                  key={index}
                  booking={booking}
                  isPass={isPass}
                ></BookingForm>
              ))
            )}
          </List>
        ) : (
          <List>
            <Title>{text.booking} </Title>
            {listBookingPass.length === 0 ? (
              <NoResult message={text.unfoundPassed}></NoResult>
            ) : (
              listBookingPass.map((booking: ListBooking, index: number) => (
                <BookingForm
                  key={index}
                  booking={booking}
                  isPass={isPass}
                ></BookingForm>
              ))
            )}
          </List>
        )}
      </Container>
    );
  }
}

export default withRouter(Booking);
