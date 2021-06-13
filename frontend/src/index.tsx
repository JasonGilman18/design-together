import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './app';

const AppWrapper = styled.span`
    font-family: Arial, sans-serif;
    color: #282c33;
`;

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('root')
);

