import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
  padding-left: 2em;

  @media only screen and (max-width: 900px) {
    width: 100%;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5em;

  @media only screen and (max-width: 900px) {
    margin-bottom: 5px;
  }
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5em;
  width: 35%;
  min-width: 450px;

  @media only screen and (max-width: 900px) {
    margin-bottom: 5px;
    width: auto;
    min-width: 100%;
  }
`;

export const FlexInput = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 25px;
  flex-direction: column;
`;

export const ColumnFlexInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 3%;
  padding-bottom: 5px;

  @media only screen and (max-width: 900px) {
    margin-bottom: 5px;
  }
`;

export const Input = styled.input`
  display: flex;
  height: 2em;
  min-width: 20em;
  font-size: 100%;
  border: 1px solid #b9b9b9;
  outline-color: #4da7bc;

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;

export const Title = styled.div`
  display: flex;
  margin: 15px 0px;
  font-size: 35px;
  font-weight: bold;
  color: #4da7bc;
`;

export const Text = styled.div`
  display: flex;
`;

export const Label = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const TextLink = styled.span`
  text-align: left;
  text-decoration: underline;
  color: #6ea7ba;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    align-self: auto;
  }
`;

export const ErrorText = styled.div`
  display: flex;
  text-align: bottom;
  vertical-align: top;
  align-self: left;
  text-align: left;
  min-width: 250px;
  vertical-align: top;
  font-size: 12px;
  line-height: auto;
  color: #e01818;
  padding-bottom: 5px;

  @media only screen and (max-width: 900px) {
    width: 80%;
    align-self: auto;
  }
`;

export const Error = styled.div`
  border: 1px solid #fcae1e;
  background-color: #fcae1e30;
  padding: 10px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin-top: 10px;
`;

export const ErrorTextReturn = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  width: 20em;
  vertical-align: top;
  font-size: 120%;
  line-height: auto;
  color: #e01818;
  padding-top: 10px;

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`;

export const FlexButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  gap: 20px;
  padding-bottom: 5px;
`;
