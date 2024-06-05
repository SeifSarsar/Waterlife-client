import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 80px;

  @media only screen and (max-width: 900px) {
    padding: 10px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
  border-style: solid;
  border-width: 1px;
  border-color: #a8a8a8; 

  @media only screen and (max-width: 900px) {
    margin: 10px 0px;
  }
`;

export const LongBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
  border-style: solid;
  border-width: 1px;
  border-color: #a8a8a8; 

  @media only screen and (max-width: 900px) {
    margin: 10px 0px;
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 40px;

  @media only screen and (max-width: 900px) {
    padding: 15px;
  }
`;

export const Title = styled.div`
  padding-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;

export const Text = styled.div`
  font-size: 16px;
  padding-bottom: 25px;
`;

export const FirstImg = styled.img`
  height: 306px;
  width: 45em;
  object-fit: cover;

  @media only screen and (max-width: 1100px) {
    height: 326px;
    width: 10em;
  }
`;

export const SecondImg = styled.img`
  height: 450px;
  width: 25em;
  object-fit: cover;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const ThirdImg = styled.img`
  height: 306px;
  width: 25em;
  object-fit: cover;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;


export const LogoLink = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 80px;
  width: 180px;
  align-self: center;
`;