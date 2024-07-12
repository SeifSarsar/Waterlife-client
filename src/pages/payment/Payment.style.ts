import styled from 'styled-components';

export const PaymentPage = styled.div`
  background-color: var (--white);
  display: flex;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export const HalfPage = styled.div`
  flex-direction: column;
  display: flex;
  width: 50%;
  padding: 20px;
  padding-top: 0px;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const DateHourTrip = styled.span`
  size:14px;
  font-weight: bold;
`;

export const HalfPageCard = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const HalfTopPageProduct = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const FlexStayInfos = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const FlexPayInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

export const FlexButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 50px;
`;

export const OrderSummary = styled.div`
  flex-direction: column;
  display: flex;
  background-color: #e5eeef;
  width: 50%;
  padding: 20px;
  height: 100%;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const ClientInfos = styled.div`
  flex-direction: column;
  display: flex;
  position: relative;
`;

export const Field = styled.div`
  size: 18px;
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
`;

export const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StayField = styled.div`
  width: inherit;
  size: 10px;
  font-weight: bold;
  padding-top: 10px;
`;

export const StayInfo = styled.div`
  size: 14px;
  font-weight: bold;
  color: #747474;
`;

export const PriceInfos = styled.div`
  padding: 10px;
`;

export const PriceStayInfos = styled.div`
  padding: 10px;
  text-align: end;
`;

export const PageTitle = styled.p`
  width: inherit;
  font-size: 25px;
  margin-top: 45px;
  margin-bottom: 0px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const ProductName = styled.div`
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: bolder;
`;

export const HalfInputContainer = styled.div`
  width: 45%;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const HalfProductTopContainer = styled.div`
  width: 45%;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const PricesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PaymentContainer = styled.div`
  width: 45%;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  height: auto;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  @media only screen and (max-width: 900px) {
    object-fit: fill;
  }
`;

export const PaymentButton = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #4da7bc;
  color: white;
  font-size: 20px;
  font-weight: bolder;

  @media only screen and (max-width: 900px) {
    height: 70px;
    font-weight: normal;
  }
`;

export const CancelButton = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bolder;

  @media only screen and (max-width: 900px) {
    height: 70px;
    font-weight: normal;
  }
`;