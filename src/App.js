import React, { Component } from 'react';
import './App.css';
import p1cat from './pieces/Cat B.png';
import p1dog from './pieces/Dog B.png';
import p1elephant from './pieces/Elephant B.png';
import p1leopard from './pieces/Leopard B.png';
import p1lion from './pieces/Lion B.png';
import p1rat from './pieces/Mouse B.png';
import p1tiger from './pieces/Tiger B.png';
import p1wolf from './pieces/Wolf B.png';
import p2cat from './pieces/Cat Y.png';
import p2dog from './pieces/Dog Y.png';
import p2elephant from './pieces/Elephant Y.png';
import p2leopard from './pieces/Leopard Y.png';
import p2lion from './pieces/Lion Y.png';
import p2rat from './pieces/Mouse Y.png';
import p2tiger from './pieces/Tiger Y.png';
import p2wolf from './pieces/Wolf Y.png';



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
              [18,19,20,21,22,23,24,25,26],
              [27,28,29,30,31,32,33,34,35],
              [36,37,38,39,40,41,42,43,44],
              [45,46,47,48,49,50,51,52,53],
              [54,55,56,57,58,59,60,61,62]],
      water: [12,13,14,21,22,23,39,40,41,48,49,50],
      p1trap: [18,28,36],
      p2trap: [26,34,44],
      p1den: 27,
      p2den: 35,
      p1: { elephant: 2,
                lion: 54,
               tiger: 0,
             leopard: 38,
                 dog: 46,
                wolf: 20,
                 cat: 10,
                 rat: 56
               },
      p2: { elephant: 60,
                lion: 8,
               tiger: 62,
             leopard: 24,
                 dog: 16,
                wolf: 42,
                 cat: 52,
                 rat: 6
               },
      selectedPiece: null,
      currentPlayer: "p1"
    }
  }

movePiece = (e) => {
  const currentPlayer = this.state.currentPlayer
  const piecePlayer = e.target.getAttribute('player')
  console.log(piecePlayer)
  console.log(currentPlayer)
  console.log(currentPlayer === piecePlayer)
  if (!this.state.selectedPiece) {
    const piece = e.target.getAttribute('piece')
    this.setState({selectedPiece: piece})
  } else {
      const piece = this.state[currentPlayer]
      piece[this.state.selectedPiece] = parseInt(e.target.getAttribute('cell'))
      this.setState({ [currentPlayer]: piece,
           currentPlayer: [this.state.currentPlayer == 'p1' ? 'p2' : 'p1' ],
          selectedPiece: null
                   })
      console.log(this.state)
  }
}


// First creates the board rows through state
  CreateBoard = (props) => {
    return (
      <React.Fragment>
        {props.board.map((row) => (
          <div className="board-row" key={row}>
            {row.map((square) => (
              <this.CreateSquareType
                key={square}
                square={square}
                water={props.water}
                p1traps={props.p1traps}
                p2traps={props.p2traps}
                p1den={props.p1den}
                p2den={props.p2den}
                p1={props.p1}
                p2={props.p2}
              />
            ))}
          </div>
        ))}
      </React.Fragment>
    )
  }

// Chooses terrain for squares
  CreateSquareType = (props) => {
    if (props.water.includes(props.square)) {
      return (
        <div className="square water" cell={props.square} onClick={this.state.selectedPiece ? this.movePiece : null} >
          <this.ShowPiece
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else if (props.p1traps.includes(props.square) || props.p2traps.includes(props.square)) {
      return (
        <div className="square trap" cell={props.square} onClick={this.state.selectedPiece ? this.movePiece : null}>
          <this.ShowPiece
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else if (props.p1den === props.square || props.p2den === props.square) {
      return (
        <div className="square den" cell={props.square} onClick={this.state.selectedPiece ? this.movePiece : null}>
          <this.ShowPiece
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else {
      return (
        <div className="square ground" cell={props.square} onClick={this.state.selectedPiece ? this.movePiece : null}>
          <this.ShowPiece
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    }
  }

// Chooses which piece to display
  ShowPiece = (props) => {
    const location = props.square
    const p1 = props.p1
    const p2 = props.p2



    switch (location) {
      case (p1.elephant):
        return (
          <img src={p1elephant} alt={p1elephant} className='piece' onClick={this.movePiece} cell={props.square} piece='elephant' player='p1' />
        );
      case (p1.lion):
        return (
          <img src={p1lion} alt={p1lion} className='piece' onClick={this.movePiece} cell={props.square} piece='lion' player='p1' />
        );
      case (p1.tiger):
        return (
          <img src={p1tiger} alt={p1tiger} className='piece' onClick={this.movePiece} cell={props.square} piece='tiger' player='p1' />
        );
      case (p1.leopard):
        return (
          <img src={p1leopard} alt={p1leopard} className='piece' onClick={this.movePiece} cell={props.square} piece='leopard' player='p1' />
        );
      case (p1.dog):
        return (
          <img src={p1dog} alt={p1dog} className='piece' onClick={this.movePiece} cell={props.square} piece='dog' player='p1' />
        );
      case (p1.wolf):
        return (
          <img src={p1wolf} alt={p1wolf} className='piece' onClick={this.movePiece} cell={props.square} piece='wolf' player='p1' />
        );
      case (p1.cat):
        return (
          <img src={p1cat} alt={p1cat} className='piece' onClick={this.movePiece} cell={props.square} piece='cat' player='p1' />
        );
      case (p1.rat):
        return (
          <img src={p1rat} alt={p1rat} className='piece' onClick={this.movePiece} cell={props.square} piece='rat' player='p1' />
        );
      case (p2.elephant):
        return (
          <img src={p2elephant} alt={p2elephant} className='piece' onClick={this.movePiece} cell={props.square} piece='elephant' player='p2' />
        );
      case (p2.lion):
        return (
          <img src={p2lion} alt={p2lion} className='piece' onClick={this.movePiece} cell={props.square} piece='lion' player='p2' />
        );
      case (p2.tiger):
        return (
          <img src={p2tiger} alt={p2tiger} className='piece' onClick={this.movePiece} cell={props.square} piece='tiger' player='p2' />
        );
      case (p2.leopard):
        return (
          <img src={p2leopard} alt={p2leopard} className='piece' onClick={this.movePiece} cell={props.square} piece='leopard' player='p2' />
        );
      case (p2.dog):
        return (
          <img src={p2dog} alt={p2dog} className='piece' onClick={this.movePiece} cell={props.square} piece='dog' player='p2' />
        );
      case (p2.wolf):
        return (
          <img src={p2wolf} alt={p2wolf} className='piece' onClick={this.movePiece} cell={props.square} piece='wolf' player='p2' />
        );
      case (p2.cat):
        return (
          <img src={p2cat} alt={p2cat} className='piece' onClick={this.movePiece} cell={props.square} piece='cat' player='p2' />
        );
      case (p2.rat):
        return (
          <img src={p2rat} alt={p2rat} className='piece' onClick={this.movePiece} cell={props.square} piece='rat' player='p2' />
        );
      default:
        return props.square
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
          p1={this.state.p1}
          p2={this.state.p2}
        />
        </header>
      </div>
    );
  }
}

export default App;
