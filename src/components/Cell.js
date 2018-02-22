import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const CellBlock = styled.div`
  background: palevioletred;
  border: 1px solid cyan;
  width: 8rem;
  height: 8rem;

  ${props =>
    props.selected &&
    css`
      background: ${props.color};
    `};
`;

export default class Cell extends Component {
  state = {
    selected: false,
    color: 'palevioletred'
  };

  static propTypes = {
    row: PropTypes.number,
    cell: PropTypes.number,
    clickHandler: PropTypes.func,
    color: PropTypes.string
  };

  handleOnClick = () => {
    const { selected, readOnly } = this.state;
    const { row, cell, clickHandler, color } = this.props;

    if (!readOnly) {
      this.setState({
        selected: !selected,
        readOnly: true,
        color
      });
      clickHandler(row, cell);
    }
  };
  render() {
    const { selected, color } = this.state;
    return (
      <CellBlock
        onClick={this.handleOnClick}
        selected={selected}
        color={color}
      />
    );
  }
}
