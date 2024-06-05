import Translator from "../../shared/translations/Translator";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../shared/buttons/Buttons.style";
import {
  ButtonContainer,
  Card,
  Contact,
  Content,
  DisplayDate,
  FirstRow,
  Image,
  LinkButton,
  SubContainer,
  UserInfo,
  Label,
} from "./Booking.style";

import { ListBooking } from "../../models/ListBooking";
import { DayBooking } from "../../models/DayBooking";
import { OvernightBooking } from "../../models/OvernightBooking";
import AxiosHandler from "../../shared/AxiosHandler";
import { useState } from "react";
import ModalDialog from "../../shared/modal/Modal";

interface Props {
  booking: ListBooking;
  isPass: boolean;
}

const EmbededBooking = (props: Props) => {
  const { booking, isPass } = props;

  const [collecting, setCollecting] = useState(false);
  const getIsSafeDepositExpired = () => {
    if (!booking.isPassed) return false;
    let lastDay;

    if (booking.payment.overnightBooking) {
      lastDay = new Date(booking.payment.overnightBooking.end);
    } else if (booking.payment.dayBooking) {
      lastDay = new Date(booking.payment.dayBooking.day);
    }

    if (!lastDay) return true;
    const today = new Date();
    const limitDay = new Date();
    limitDay.setDate(lastDay.getDate() + 7);
    return today.getTime() > limitDay.getTime();
  };

  const [showSafeDeposit, setShowSafeDeposit] = useState(false);

  const isSafeDepositExpired = getIsSafeDepositExpired();

  const [isSafeDepositAvailable, setIsSafeDepositAvailable] = useState(
    booking.isPassed &&
      booking.payment.safeDepositPaymentId !== "" &&
      booking.payment.isSafeDepositAccepted === false &&
      !isSafeDepositExpired
  );

  const collectSafeDeposit = () => {
    setCollecting(true);
    AxiosHandler.post(
      `/confirm/payment/${booking.payment.safeDepositPaymentId}`
    )
      .then(() => {
        AxiosHandler.put(`/update/payment/${booking.payment._id}`, {
          isSafeDepositAccepted: true,
        })
          .then(() => {
            setConfirmedDeposit(true);
            setIsSafeDepositAvailable(false);
          })
          .catch(() => {});
        setCollecting(false);
      })
      .catch(() => {
        setCollecting(false);
      });
  };

  const closeModal = () => {
    setShowSafeDeposit(false)
    setConfirmedDeposit(false)
  }

  const [confirmedDeposit, setConfirmedDeposit] = useState(false);
  const text = Translator.getBookingText();

  const dayBooking: DayBooking | null = booking.payment.dayBooking
    ? {
        day: new Date(booking.payment.dayBooking.day),
        start: booking.payment.dayBooking.start,
        end: booking.payment.dayBooking.end,
      }
    : null;

  const overnightBooking: OvernightBooking | null = booking.payment
    .overnightBooking
    ? {
        start: new Date(booking.payment.overnightBooking.start),
        end: new Date(booking.payment.overnightBooking.end),
      }
    : null;

  return (
    <Card>
      <FirstRow>
        <SubContainer>
          {!isPass ? (
            <Image src="/images/booking/person.svg" />
          ) : (
            <Image src="/images/booking/time.svg" />
          )}
          <Content>
            {overnightBooking && (
              <>
                <DisplayDate>
                  <Label>{text.from}</Label>
                  {overnightBooking.start.toLocaleDateString()}
                </DisplayDate>
                <DisplayDate>
                  <Label>{text.to}</Label>
                  {overnightBooking.end.toLocaleDateString()}
                </DisplayDate>
              </>
            )}
            {dayBooking && (
              <>
                <DisplayDate>
                  <Label>{text.day}</Label>
                  {dayBooking.day.toLocaleDateString()}
                </DisplayDate>
                <DisplayDate>
                  <Label>{text.from}</Label> {dayBooking.start}:00
                </DisplayDate>
                <DisplayDate>
                  <Label>{text.to}</Label> {dayBooking.end}:00
                </DisplayDate>
              </>
            )}
          </Content>
          <Content>
            <Contact>
              <Label>Contact:</Label>

              <UserInfo>
                <div>
                  {booking.user.lastName} {booking.user.firstName}
                </div>
                <div>{booking.user.phoneNumber}</div>
                <div> {booking.user.email} </div>
              </UserInfo>
            </Contact>
          </Content>
          <Content>
            <Contact>
              <Label>{text.price}</Label>

              <UserInfo>
                {booking.payment.initialPrice +
                  booking.payment.taxes +
                  booking.payment.charges}
                $ CAD
              </UserInfo>
            </Contact>
            {booking.payment.safeDepositPaymentId !== "" && (
              <Contact>
                <Label>{text.safeDeposit}</Label>
                <UserInfo>{booking.payment.safeDepositAmount}$ CAD</UserInfo>
              </Contact>
            )}
          </Content>
        </SubContainer>
        <ButtonContainer>
          {isSafeDepositAvailable && (
              <PrimaryButton onClick={() => setShowSafeDeposit(true)}>
                {collecting ? text.collecting : text.depot}
              </PrimaryButton>
            )}
          {!isPass && (
            <LinkButton to={`/ownerrefund/${booking.payment._id}`}>
              <SecondaryButton>{text.cancelBooking}</SecondaryButton>
            </LinkButton>
          )}
        </ButtonContainer>
      </FirstRow>
      <ModalDialog
        show={showSafeDeposit}
        handleClose={() => setShowSafeDeposit(false)}
        title={text.safeDeposit}
        text={text.safeDepositConfirm}
        secondaryBtn={true}
        secondaryBtnText={text.cancel}
        primaryBtnText={text.confirm}
        onConfirm={collectSafeDeposit}
      />

      <ModalDialog
        show={confirmedDeposit}
        handleClose={() => setConfirmedDeposit(false)}
        title={text.confirmedDeposit}
        secondaryBtn={false}
        primaryBtnText={text.confirm}
        onConfirm={closeModal}
      />
    </Card>
  );
};

export default EmbededBooking;
