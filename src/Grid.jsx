import React, { Component } from 'react';
import NumberDisplay from './NumberDisplay.jsx';

class Grid extends Component {

  isNumberAtXY = (x, y) => (it) => it.type === NumberDisplay && it.props.x === x && it.props.y === y;

  createTable = () => {
    let table = []

    // TODO should be possible to write this as some nice functional expression
    for (let y = 0; y < this.props.rows; y++) {
      let row = []
      for (let x = 0; x < this.props.cols; x++) {
        const numbers = React.Children.map(this.props.children, child => child).filter(this.isNumberAtXY(x, y));
        const content = numbers.find((it) => true);
        row.push(<td key={x + "," + y}>{content}</td>);
      }
      table.push(<tr key={y}>{row}</tr>);
    }

    return table
  }

  render() {
    return (
      <table>
        <tbody>
          {this.createTable()}
        </tbody>
      </table>
    );
  }
}

export default Grid;
