import { TypeToString } from '../../enums/Type';
import { HistoricRentals } from '../../models/HistoricRentals';
import Translator from '../../shared/translations/Translator';
import ProductReview from './Review';
import {
  SubContainer,
  Image,
  Content,
  Title,
  Price,
  Type,
  Address,
  DisplayDate,
  Card,
  ButtonContainer,
  FirstRow,
  Contact,
  UserInfo,
  PriceContainer,
} from './Histotic.style';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../shared/buttons/Buttons.style';

import { Link } from 'react-router-dom';
import { Routes } from '../../enums/Routes';

const LinkStyle = {
  textDecoration: 'none',
};

interface Props {
  rental: HistoricRentals;
  isActualRental: boolean;
}

const EmbededHistoric = (props: Props) => {
  const text = Translator.getHistoricText();
  const { rental, isActualRental } = props;
  if (rental.product._id === undefined) return <> </>;
  return (
    <Card>
      <FirstRow>
        <SubContainer>
          <Link to={Routes.Products + '/' + rental.product._id}>
            <Image
              src={rental.product.images[rental.product.thumbnail]}
            ></Image>
          </Link>
          <Content>
            <Type>
              {TypeToString(rental.product.category, rental.product.type)}
            </Type>
            <Title>{rental.product.title}</Title>
            <Address>
              {rental.product.address.fullAddress.replace(/,/g, ', ')}
            </Address>
            <SubContainer>
              {rental.overnightBooking && (
                <Content>
                  <DisplayDate>
                    {text.from}
                    {rental.overnightBooking.start.toLocaleDateString()}
                  </DisplayDate>
                  <DisplayDate>
                    {text.to}
                    {rental.overnightBooking.end.toLocaleDateString()}
                  </DisplayDate>
                </Content>
              )}
              {rental.dayBooking && (
                <Content>
                  <DisplayDate>
                    {text.day}
                    {rental.dayBooking.day.toLocaleDateString()}
                  </DisplayDate>
                  <DisplayDate>
                    {text.from}
                    {rental.dayBooking.start}:00
                  </DisplayDate>
                  <DisplayDate>
                    {text.to}
                    {rental.dayBooking.end}:00
                  </DisplayDate>
                </Content>
              )}
              {rental.overnightBooking && (
                <Content>
                  {text.checkin}
                  <DisplayDate>
                    {text.from}
                    {rental.product.checkinStart}:00
                  </DisplayDate>
                  <DisplayDate>
                    {text.to}
                    {rental.product.checkinEnd}:00
                  </DisplayDate>
                </Content>
              )}
              {rental.overnightBooking && (
                <Content>
                  {text.checkout}
                  <DisplayDate>
                    {text.before}
                    {rental.product.checkinStart}:00
                  </DisplayDate>
                </Content>
              )}
            </SubContainer>

            <Contact>
              Contact:
              <UserInfo>
                <div>{rental.phone}</div>
                <div> {rental.email} </div>
              </UserInfo>
            </Contact>
          </Content>
        </SubContainer>

        <ButtonContainer>
          <PriceContainer>
            <Price>{rental.product.price + text.ppn}</Price>
            <Price>
              {text.safedeposit}: {rental.product.safeDepositAmount}$
            </Price>
          </PriceContainer>
          {isActualRental && (
            <Link style={LinkStyle} to={`/products/${rental.product._id}`}>
              <PrimaryButton>{text.detail}</PrimaryButton>
            </Link>
          )}
          {isActualRental && (
            <Link style={LinkStyle} to={`/refund/${rental.paymentId}`}>
              <SecondaryButton>{text.cancel}</SecondaryButton>
            </Link>
          )}
        </ButtonContainer>
      </FirstRow>
      {!isActualRental && <ProductReview productId={rental.product._id} product={rental.product}/>}
    </Card>
  );
};

export default EmbededHistoric;
