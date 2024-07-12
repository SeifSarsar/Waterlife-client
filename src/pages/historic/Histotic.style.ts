import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const List = styled.div`
  margin-right: 10px;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  width: 100%;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  height: 180px;
  width: 240px;
  object-fit: cover;
  border-radius: 5px 5px 0px 0px;

  @media only screen and (max-width: 900px) {
    height: 100px;
    width: 100%;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 95%;
  margin-bottom: 20px;
  border: solid;
  border-width: thin;
  border-color: #d4d4d4;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

  @media only screen and (max-width: 900px) {
    width: 90%;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-left: 30px;

  @media only screen and (max-width: 900px) {
    padding-left: 0px;
  }
`;

export const Title = styled.div`
  font-size: 21px;
  margin: 10px 0px;
  color: #4da7bc;
  text-overflow: ellipsis;
  font-weight: bold;
`;

export const Address = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
  text-overflow: ellipsis;
`;

export const Type = styled.div`
  font-size: 14px;
  color: #4da7bc;
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  align-self: flex-end;
  padding-right: 10px;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const DisplayDate = styled.span`
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-self: top;
  gap: 5px;
  flex-direction: column;
  align-content: space-between;
`;

export const Contact = styled.div`
  display: flex;
  padding-top: 20px;
  width:80%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

export const SecondRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const Input = styled.textarea`
  padding: 12px 20px;
  width: 100%;
  height: 100px;
  border: 1px solid #b9b9b9;
  outline-color: #4da7bc;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const ButtonRating = styled.div`
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
  width: 200px;
  text-align: center;

  @media only screen and (max-width: 900px) {
    padding-bottom: 0px;
    padding-top: 15px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60%;

  @media only screen and (max-width: 900px) {
    padding-bottom: 0px;
  }
`;