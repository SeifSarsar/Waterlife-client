import styled from "styled-components";

export const ColumnFlexInput = styled.div`
  display: flex;
  margin-top: 3%;
  padding-bottom: 30px;
  justify-content: center;
  flex-direction: row;

  @media only screen and (max-width: 900px) {
    margin-bottom: 5px;
  }
`;


export const List = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 30px;
  flex-wrap: wrap;
  padding-left: 50px;

  @media only screen and (max-width: 900px) {
    width: 100%;
    box-shadow: 0;
    height: auto;
    padding: 30px 0px;
    justify-content: center;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-color: #a8a8a8; 
  padding: 0px 20px;
  
  @media only screen and (max-width: 900px) {
    
  }
  `;

export const Text = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

export const Country = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

export const Amount = styled.div`
  display: flex;
  padding-top: 5px;
`;

export const ReverseButton = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
  color: #4da7bc;
  border: 1px solid #4da7bc;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 20px;

  &:hover {
    color: #196a7d;
    border: 1px solid #196a7d;
  }

  &.disabled {
    border: 1px solid #e3e3e3;
    color: #e3e3e3;
    pointer-events: none;
  }
`;

export const Line = styled.div`
  width: 100px;
  margin-left: -10px;
  border-bottom: 1px solid #000000;
`;
