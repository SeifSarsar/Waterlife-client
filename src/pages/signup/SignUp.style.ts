import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
  @media only screen and (max-width: 900px) {
    margin-bottom: 3em;
  }
`;

export const Logo = styled.img`
  height: 80px;
  width: 180px;
  align-self: center;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export const ConnectionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 40em;
  padding: 40px 20px;
  margin-top: 3%;
  background-color: #ffffff;
  border: 3px solid #f2f2f2;
  align-items: center;

  @media only screen and (max-width: 900px) {
    border: none;
    width: 30em;
  }
`;

export const Input = styled.input`
  display: flex;
  text-align: bottom;
  vertical-align: top;
  align-self: center;
  align-items: center;
  font-size: 100%;
  outline-color: #4da7bc;
  line-height: auto;
  color: #000;
  height: 2em;
  width: 30em;
  background-color: #ffffff;
  border: 1px solid #b9b9b9;

  @media only screen and (max-width: 900px) {
    width: 18em;
  }
`;
export const Text = styled.div`
  display: flex;
  text-align: bottom;
  margin-top: 3%;
  padding-bottom: 5px;
  width: 80%;
`;
export const ErrorText = styled.div`
  display: flex;
  text-align: bottom;
  vertical-align: top;
  align-self: center;
  text-align: left;
  width: 80%;
  vertical-align: top;
  font-size: 80%;
  line-height: auto;
  color: #e01818;
  padding-top: 5px;
`;

export const ErrorTextReturn = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  width: 80%;
  vertical-align: top;
  font-size: 120%;
  line-height: auto;
  color: #e01818;
  padding-top: 10px;
`;

export const Select = styled.select`
  width: 10em;
  vertical-align: top;
  height: 40px;
  border-radius: 5px;
  left: 0px;
`;

export const ConnectionAccountText = styled.div`
  text-align: center;
  vertical-align: top;
  margin-top: 1%;
  font-size: 80%;
  line-height: auto;
  text-decoration: underline;
  color: #4da7bc;
  padding-top: 5px;
`;
