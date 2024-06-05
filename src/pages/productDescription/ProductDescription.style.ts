import styled from 'styled-components';

export const Header = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 30px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #000000;
  font-style: normal;
  margin-bottom: 30px;

  @media only screen and (max-width: 900px) {
    height: auto;
  }
`;

export const Name = styled.span`
  font-weight: 700;
  line-height: 23px;
  padding-bottom: 15px;

  @media only screen and (max-width: 900px) {
    height: auto;
    padding-bottom: 0px;
  }
`;

export const Price = styled.span`
  font-weight: bold;

  @media only screen and (max-width: 900px) {
    font-size: 14px;
    padding-bottom: 15px;
  }
`;

export const Adress = styled.div`
  font-weight: 700;

  @media only screen and (max-width: 900px) {
    font-size: 15px;
  }
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

export const Capacity = styled.span`
  color: lightslategray;
`;

export const PhotoContainer = styled.div`
  margin: auto;
  width: 80%;
`;

export const Tabs = styled.div`
  display: flex;
  /* width: 55%; */
  height: 50px;
  margin-left: 90px;
  margin-top: 30px;
  line-height: 50px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  gap: 25px;
  justify-content: flex-start !important;

  @media only screen and (max-width: 900px) {
    width: 90%;
    margin-left: 10px;
    gap: 5px;
  }
`;

export const DescriptionTab = styled.div`
  height: 100%;
  background-color: #4da7bc;
  color: white;
  padding-left: 15px;
  border-radius: 6px;
  cursor: pointer;
  padding: 0px 10px;
  @media only screen and (max-width: 900px) {
    font-size: 17px;
    width: 30%;
    padding-left: 5px;
  }
`;

export const ReviewsTab = styled.div`
  height: 100%;
  color: #4da7bc;
  background-color: white;
  padding-left: 15px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  padding: 0px 10px;

  @media only screen and (max-width: 900px) {
    font-size: 18px;
    width: 25%;
    padding-left: 10px;
  }
`;

export const AmenitiesTab = styled.div`
  color: #4da7bc;
  background-color: white;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  padding: 0px 10px;

  @media only screen and (max-width: 900px) {
    font-size: 17px;
    width: 40%;
    padding-left: 10px;
  }
`;

export const DescriptionGrid = styled.div`
  margin-left: 90px;
  width: 60%;
  margin-right: 30px;
  margin-top: 10px;
  row-gap: 30px;
  margin-bottom: 50px;
  font-size: large;

  @media only screen and (max-width: 900px) {
    margin-right: 10px;
    margin-left: 10px;
    width: 100%;
    word-wrap: break-word;
  }
`;

export const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: [first] 50% [line2] 50%;
  grid-template-rows: [first] 5% [line2] 95%;
  margin-left: 90px;
  width: 60%;
  margin-right: 30px;
  margin-top: 30px;
  row-gap: 30px;
  margin-bottom: 50px;
  font-size: large;

  @media only screen and (max-width: 900px) {
    margin-right: 10px;
    margin-left: 10px;
    width: 100%;
    word-wrap: break-word;
  }
`;

export const AmenitiesList = styled.ul`
  list-style-type: none;
  margin-top: 0;
  padding-left: 0;
  grid-row-start: 2;
  grid-row-end: 3;
`;

export const RulesList = styled.ul`
  list-style-type: none;
  margin-top: 0;
  padding-left: 0;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
`;

export const BedsList = styled.ul`
  padding-right: 0;
  list-style-type: none;
  -webkit-padding-start: 0;
`;

export const MapContainer = styled.div`
  margin: auto;
  width: 35%;
  height: 300px;
  margin-bottom: 100px;
  border: 1px solid black;
  margin-top: 30px;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const DescriptionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

export const CheckIn = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

export const AmenitiesTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  grid-row-start: 1;
  grid-row-end: 2;
`;

export const RulesTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
`;

export const Line = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #000000;
  margin-bottom: 50px;
`;

export const Reservation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

export const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  font-size: x-large;
  color: #4da7bc;
`;

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  gap: 20px;
  margin: auto;
  margin-bottom: 30px;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    margin: 0px;
    margin-bottom: 30px;
    margin-left: 15%;
  }
`;

export const FinalPrice = styled.div`
  background: #ffffff;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  width: 250px;
  padding: 20px;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: 10px;

  @media only screen and (max-width: 900px) {
    width: 250px;
    padding: 20px;
  }
`;

export const Reviews = styled.div`
  height: 300px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export const ReviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: x-large;
  color: #4da7bc;
  column-gap: 15px;
  margin-top: 30px;
`;

export const BookButton = styled.button`
  width: 100%;
  height: 52px;
  background: #4da7bc;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-top: 30px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: lightgray;
  }
`;

export const AmenityLi = styled.li`
  margin-top: 10px;
`;

export const MiddleContainer = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Comment = styled.div`
  margin-left: 50px;
  margin-top: 30px;

  @media only screen and (max-width: 900px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const CommentUnderLine = styled.div`
  border-bottom: 2px solid #4da7bc;
  padding-top: 30px;
  width: 100%;
  margin: auto;
`;

export const CommentDate = styled.div`
  text-align: right;
  margin-top: 15px;
  font-size: small;
  color: #4da7bc;
  @media only screen and (max-width: 900px) {
    padding-right: 20px;
  }
`;

export const NoReviews = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid #4da7bc;
  color: #4da7bc;
`;

export const Hours = styled.div`
  display: grid;
  grid-template-columns: [first] 25% [line2] 25% [line3] 25% [line4] 25%;
  text-align: center;
  gap: 5px;
  margin-right: 20px;
  @media only screen and (max-width: 900px) {
    padding-bottom: 15px;
  }
`;

export const Hour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 75px;
  line-height: 25px;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #4da7bc;
  cursor: pointer;
  font-weight: bold;
`;

export const HourRange = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: large;
  font-weight: bold;
  color: '#4DA7BC';
`;

export const DateError = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 30px;
`;

export const MotorDiv = styled.div`
  font-weight: bold;
  font-size: large;
  margin-top: 10px;
`;

export const CaptainDiv = styled.div`
  font-weight: bold;
  font-size: large;
  margin-top: 10px;
`;

export const BoatLicense = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 25% 40px 25%;
  padding: 15px 0px;
  gap: 10px;
  font-size: 25px;
  border-style: solid;
  border-width: 1px;
  align-items: center;

  @media only screen and (max-width: 900px) {
    margin: 0px 2% 40px 2%;
    font-size: 20px;
    padding: 15px 5px;
  }
`;
