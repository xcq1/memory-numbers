import React, { Component } from 'react';

class NumberDisplay extends Component {
  render() {
    return (
    <p className={this.props.hidden ? "hidden" : undefined} onClick={this.props.onClick}>{this.props.value}</p>
    );
  }
}

export default NumberDisplay;
