import React, { Component } from 'react';
import './App.css';
import Grid from './Grid.jsx';
import NumberDisplay from './NumberDisplay.jsx';

const Outcome = Object.freeze({"Ready": 1, "Win": 2, "Lose": 3});

class App extends Component {

  // React interface

  constructor(props) {
    super(props);
    this.timeToView = 500;
    this.maxNumber = 5;
    this.state = {
      numbers: [], 
      lastClick: undefined,
      outcome: undefined
    };    
  }

  random = (max) => Math.floor(Math.random() * max);

  componentDidMount() {
    this.beforeGame();
  }  

  render() {
    let numbers = [];
    this.state.numbers.forEach(({value, x, y, hidden}) => {
      numbers.push(<NumberDisplay value={value} x={x} y={y} hidden={hidden} key={x + "," + y} onClick={this.clickedOn(value)} />)
    });

    let outcomeClass = undefined;
    switch (this.state.outcome) {
      case Outcome.Lose:
        outcomeClass = "lose";
        break;
      case Outcome.Win:
        outcomeClass = "win";
        break;
      default:
    }

    return (
      <div className={outcomeClass}>
        <Grid rows="5" cols="8">{numbers}</Grid>
      </div>
    );
  }

  // internal logic

  beforeGame = () => {
    this.initRound();
    window.setTimeout(this.startRound, this.timeToView);
  };

  initRound = () => {
    let numbers = [];
    // TODO there has to be a nicer way of doing this
    for (const i of Array(this.maxNumber).keys()) {
      let numberAssigned = false;      
      do {
        const rx = this.random(8);
        const ry = this.random(5);
        numberAssigned = !numbers.find(it => it.x === rx && it.y === ry);
        if (numberAssigned) {
          numbers.push({value: i + 1, x: rx, y: ry, hidden: false});
        }
      } while(!numberAssigned);      
    }

    this.setState({
      numbers,
      lastClick: undefined,
      outcome: undefined
    });
  }

  startRound = () => {
    this.setState({
      numbers: this.state.numbers.map(it => Object.assign(it, {hidden: true})),
      outcome: Outcome.Ready
    });
  }

  unhide(number) {
   this.setState({numbers: this.state.numbers.map(it => it.value !== number ? it : Object.assign(it, {hidden: false}))});
  }

  clickedOn = (number) => () => {
    if (this.state.outcome !== Outcome.Ready)
      return;

    this.unhide(number);

    const numberBefore = (number > 1) ? number - 1 : undefined;
    if (this.state.lastClick !== numberBefore) {
      this.setState({outcome: Outcome.Lose});
    } else {
      if (number < this.maxNumber) {
        this.setState({lastClick: number});
      } else {
        this.setState({outcome: Outcome.Win});
        window.setTimeout(this.beforeGame, 500);
      }
    }    
  }
}

export default App;
