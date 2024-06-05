import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
      font-family: 'Roboto', sans-serif;
    }

    html,body {
      height: 100vh;
    }

    body{
      margin:0px;
      padding:0px;
    }
    
    #root {
      height:100%;
    }

    .pac-container{
      background-color: #f8f8f8;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }

    .pac-icon-marker {
      display:none;
    }

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle></GlobalStyle>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
