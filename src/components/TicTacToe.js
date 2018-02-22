import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Cell from './Cell';

const PlayAgain = styled.button`
  background: white;
  border: 2px solid navy;
  color: navy;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  max-width: 24rem;
  max-height: 24rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid cyan;
`;

const Winner = styled.span`
  ${props =>
    css`
      color: ${props.color};
    `};
`;

const COLORS = {
  tic: 'purple',
  tac: 'mediumspringgreen'
};

const DEFAULTSTATE = () => ({
  matrix: {
    0: [null, null, null],
    1: [null, null, null],
    2: [null, null, null]
  },
  currentPlayer: 'tic',
  winner: undefined,
  moves: 0,
  gameOver: false
});

export default class TicTacToe extends Component {
  state = DEFAULTSTATE();

  flipPlayer = () => {
    let currentPlayer = '';
    this.state.currentPlayer === 'tic'
      ? (currentPlayer = 'tac')
      : (currentPlayer = 'tic');
    this.setState({ currentPlayer });
  };

  renderRows() {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(<Row key={`row-${i}`}>{this.renderCells(i)}</Row>);
    }
    return rows;
  }

  renderCells(rowKey) {
    const cells = [];
    for (let i = 0; i < 3; i++) {
      cells.push(
        <Cell
          key={`cell-${i}`}
          clickHandler={this.markAsSet}
          color={COLORS[this.state.currentPlayer]}
          row={rowKey}
          cell={i}
        />
      );
    }
    return cells;
  }

  markAsSet = (row, cell) => {
    const { matrix, currentPlayer, moves } = this.state;
    matrix[row][cell] = currentPlayer;
    this.setState({ matrix, moves: moves + 1 }, this.checkWinner);
  };

  checkWinner = () => {
    this.checkRows();
    this.checkColumns();
    this.checkDiagonal();
    this.state.moves === 9 && this.setState({ gameOver: true });
  };

  checkRows = () => {
    const { matrix } = this.state;
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        return this.setState({ winner: matrix[i][0] });
      }
    }
  };

  checkColumns = () => {
    const { matrix } = this.state;
    for (let i = 0; i < 3; i++) {
      if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
        return this.setState({ winner: matrix[0][i] });
      }
    }
  };

  checkDiagonal = () => {
    const { matrix } = this.state;
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[1][1] &&
      matrix[1][1] === matrix[2][2]
    ) {
      return this.setState({ winner: matrix[0][0] });
    }
    if (
      matrix[0][2] &&
      matrix[0][2] === matrix[1][1] &&
      matrix[1][1] === matrix[2][0]
    ) {
      return this.setState({ winner: matrix[0][2] });
    }
  };

  resetGame = () => {
    this.setState(DEFAULTSTATE());
  };

  render() {
    const { winner, gameOver } = this.state;

    const renderWinner = () => (
      <div>
        <h2>
          We have a winner! Congrats{' '}
          <Winner color={COLORS[winner]}>{COLORS[winner]}</Winner>
        </h2>
        <PlayAgain onClick={this.resetGame}>Play again</PlayAgain>
      </div>
    );

    const renderGameOver = () => (
      <div>
        <h2>Game Over ;(</h2>
        <PlayAgain onClick={this.resetGame}>Play again</PlayAgain>
      </div>
    );

    if (winner) {
      return renderWinner();
    }
    if (gameOver) {
      return renderGameOver();
    }

    if (!winner && !gameOver) {
      return <Wrapper onClick={this.flipPlayer}>{this.renderRows()}</Wrapper>;
    }
  }
}
