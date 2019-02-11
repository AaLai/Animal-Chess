import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // board size 7 X 9
  // water 12,13,14,21,22,23,39,40,41,48,49,50
  // traps p1: 18,28,36 p2: 26,34,44
  // den p1: 27 p2: 35
        // board: [[ 0, 1, 2, 3, 4, 5, 6, 7, 8],
                // [ 9,10,11,12,13,14,15,16,17],
                // [18,19,20,21,22,13,24,25,26],
                // [27,28,29,30,31,32,33,34,35],
                // [36,37,38,39,40,41,42,43,44],
                // [45,46,47,48,49,50,51,52,53],
                // [54,55,56,57,58,59,60,61,62]]

  constructor(props) {
    super(props)
    this.state = {
      board: [[ 0, 1, 2, 3, 4, 5, 6, 7, 8],
              [ 9,10,11,12,13,14,15,16,17],
              [18,19,20,21,22,13,24,25,26],
              [27,28,29,30,31,32,33,34,35],
              [36,37,38,39,40,41,42,43,44],
              [45,46,47,48,49,50,51,52,53],
              [54,55,56,57,58,59,60,61,62]],
      water: [12,13,14,21,22,23,39,40,41,48,49,50],
      p1trap: [18,28,36],
      p2trap: [26,34,44],
      p1den: 27,
      p2den: 35,
      p1piece: { elephant: 2,
                     lion: 54,
                    tiger: 0,
                  leopard: 38,
                      dog: 46,
                     wolf: 20,
                      cat: 10,
                      rat: 56
               },
      p2piece: { elephant: 60,
                     lion: 8,
                    tiger: 62,
                  leopard: 24,
                      dog: 16,
                     wolf: 42,
                      cat: 52,
                      rat: 6
               }
    }
  }

  CreateBoard = (props) => {
    return (
        <React.Fragment>
          {props.board.map((row) => (
            <div className="board-row">
              <this.CreateSquare
                row={row}
                water={props.water}
                p1traps={props.p1traps}
                p2traps={props.p2traps}
                p1den={props.p1den}
                p2den={props.p2den}
              />
            </div>
          ))}
        </React.Fragment>
    )
  }

  CreateSquare = (props) => {
    return (
      <React.Fragment>
      {props.row.map((square) => (
        <this.CreateSquareType
          square={square}
          water={props.water}
          p1traps={props.p1traps}
          p2traps={props.p2traps}
          p1den={props.p1den}
          p2den={props.p2den}
        />
      ))}
      </React.Fragment>
    )
  }

  CreateSquareType = (props) => {
    if (props.water.includes(props.square)) {
      return (
        <div className="square water">
          {props.square}
        </div>
      )
    } else if (props.p1traps.includes(props.square) || props.p2traps.includes(props.square)) {
      return (
        <div className="square trap">
          {props.square}
        </div>
      )
    } else if (props.p1den === props.square || props.p2den === props.square) {
      return (
        <div className="square den">
          {props.square}
        </div>
      )
    } else {
      return (
        <div className="square ground">
          {props.square}
        </div>
      )
    }
  }


  render() {
    return (
      <div>
        <header>
        <this.CreateBoard
          board={this.state.board}
          water={this.state.water}
          p1traps={this.state.p1trap}
          p2traps={this.state.p2trap}
          p1den={this.state.p1den}
          p2den={this.state.p2den}
        />
        </header>
      </div>
    );
  }
}

export default App;
