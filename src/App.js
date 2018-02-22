import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';

import TicTacToe from './components/TicTacToe';
const Wrapper = styled.div`
  text-align: center;
`;
const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;
const Title = styled.h1`
  font-size: 1.5em;
`;
const spinningLogo = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;
const Logo = styled.img`
  animation: ${spinningLogo} infinite 20s linear;
  height: 80px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title>Tic Tac Toe & React</Title>
        </Header>
        <TicTacToe />
      </Wrapper>
    );
  }
}

export default App;
