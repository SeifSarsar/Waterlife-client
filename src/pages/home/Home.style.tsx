import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media only screen and (max-width: 1150px) {
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  font-size: 11px;
  font-weight: 600;
  padding-bottom: 5em;
  padding-top: 2em;
  width: 100%;
`;

export const DestinationContainer = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  color: #4da7bc;
  font-size: 20px;
  padding: 20px;
  margin: 5em;
  width: 65%;
  min-width: 300px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f8f8f8;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.8);

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    width: 90%;
    margin: 2em;
  }
`;

export const Slogan = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(110, 167, 186, 1);
  color: white;
  font-size: 40px;
  text-align: left;
  padding: 1.7em;
  font-weight: lighter;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    font-size: 25px;
  }
`;

export const ImgSlogan = styled.img`
  align-self: flex-end;
  height: 19em;
  width: 19em;
  margin-top: -220px;

  @media only screen and (max-width: 1225px) {
    display: none;
  }
`;

export const AboutLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: left;
  color: white;
  padding-top: 1em;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    font-size: 15px;
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 2em;
  flex-wrap: wrap;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: left;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
`;

export const ImgCategory = styled.img`
  height: 306px;
  width: 25em;
  object-fit: cover;
  padding-bottom: 10px;

  @media only screen and (max-width: 1100px) {
    width: 13em;
    height: 13em;
  }
`;

export const NauticalTrips = styled.div`
  display: flex;
  align-self: center;
  background: rgba(200, 215, 217, 1);
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 30px;
`;

export const TextNauticalTrips = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  max-height: 459px;
  width: 45%;
  padding-left: 1.5em;

  @media only screen and (max-width: 900px) {
    width: 100%;
    font-size: 25px;
    padding: 1em;
  }
`;

export const ImgNauticalTrips = styled.img`
  max-height: 459px;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
