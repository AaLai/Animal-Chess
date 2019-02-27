import React, { Component } from 'react';
import './App.css';
import p1cat from './animals/Cat B.png';
import p1dog from './animals/Dog B.png';
import p1elephant from './animals/Elephant B.png';
import p1leopard from './animals/Leopard B.png';
import p1lion from './animals/Lion B.png';
import p1rat from './animals/Mouse B.png';
import p1tiger from './animals/Tiger B.png';
import p1wolf from './animals/Wolf B.png';
import p2cat from './animals/Cat Y.png';
import p2dog from './animals/Dog Y.png';
import p2elephant from './animals/Elephant Y.png';
import p2leopard from './animals/Leopard Y.png';
import p2lion from './animals/Lion Y.png';
import p2rat from './animals/Mouse Y.png';
import p2tiger from './animals/Tiger Y.png';
import p2wolf from './animals/Wolf Y.png';



class App extends Component {
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
      p1traps: [18,28,36],
      p2traps: [26,34,44],
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
      selectedAnimal: null,
      currentPlayer: "p1",
      winner: null
    }
  }

clickAnimal = (e) => {
  e.stopPropagation();
  const selectedAnimal = this.state.selectedAnimal
  const currentPlayer = this.state.currentPlayer
  const animalOwner = e.target.getAttribute('player')
  if (!selectedAnimal) {
    if (currentPlayer === animalOwner) {
      const animal = e.target.getAttribute('animal')
      this.setState({ selectedAnimal: animal })
    } else {
      alert("This is not your animal!")
    }
  } else if (currentPlayer === animalOwner) {
    const animal = e.target.getAttribute('animal')
    this.setState({ selectedAnimal: animal })
// This block deals with animal capture logic
// It may need to be seperated out soon...
  } else if (currentPlayer !== animalOwner) {
    const opposingAnimal = e.target.getAttribute('animal')
    const currentLocation = parseInt(this.state[currentPlayer][selectedAnimal])
    const newLocation = parseInt(this.state[animalOwner][opposingAnimal])
    const playerAnimalRank = Object.keys(this.state[currentPlayer]).indexOf(this.state.selectedAnimal);
    const opposingAnimalRank = Object.keys(this.state[animalOwner]).indexOf(opposingAnimal);
    if (this.canCaptureOtherAnimal(playerAnimalRank, opposingAnimalRank, currentLocation, newLocation)) {
      const currentPlayerAnimals = this.state[currentPlayer]
      const opposingAnimals = this.state[animalOwner]
      currentPlayerAnimals[this.state.selectedAnimal] = parseInt(newLocation)
      opposingAnimals[opposingAnimal] = null
      this.setState({ [currentPlayer]: currentPlayerAnimals,
                        [animalOwner]: opposingAnimals,
                        currentPlayer: this.state.currentPlayer === 'p1' ? 'p2' : 'p1',
                       selectedAnimal: null
                   })
    } else {
      alert("You can't capture this animal!")
    }
  }
}

clickTerrain = (e, capture) => {
  // current base for allowing movement
  const currentPlayer = this.state.currentPlayer
  const animals = this.state[currentPlayer]
  const currentLocation = parseInt(animals[this.state.selectedAnimal])
  const newLocation = parseInt(e.target.getAttribute('cell'))
  console.log(Object.keys(this.state[currentPlayer]).indexOf(this.state.selectedAnimal))
  //
  //
  // Currently working on movement logic here an in selected animal
  //
  //
  if (this.state.selectedAnimal) {
    if (this.canMoveToLocation(this.state.selectedAnimal, currentLocation, newLocation)) {
        animals[this.state.selectedAnimal] = parseInt(e.target.getAttribute('cell'))
        this.setState({ [currentPlayer]: animals,
                        currentPlayer: this.state.currentPlayer === 'p1' ? 'p2' : 'p1',
                        selectedAnimal: null
                     })
    } else {
      alert("You can't move there!")
    }
  }
}

canMoveToLocation = (animal, currentLocation, newLocation) => {
  const water = this.state.water
  if (this.state.currentPlayer === "p1" && newLocation === this.state.p1den) {
    return false;
  } else if (this.state.currentPlayer === "p2" && newLocation === this.state.p2den) {
    return false;
  } else if (this.animalCanJump(animal)) {
    if (water.includes(currentLocation + 9) && water.includes(currentLocation + 18)) {
      if (this.ratCheck([currentLocation + 9, currentLocation + 18])) {
        return true;
      }
    } else if (water.includes(currentLocation - 9) && water.includes(currentLocation - 18)) {
      if (this.ratCheck([currentLocation - 9, currentLocation - 18])) {
        return true;
      }
    } else if (water.includes(currentLocation + 1) && water.includes(currentLocation + 2) && water.includes(currentLocation + 3)) {
      if (this.ratCheck([currentLocation + 1, currentLocation + 2, currentLocation + 3])) {
        return true;
      }
    } else if (water.includes(currentLocation - 1) && water.includes(currentLocation - 2) && water.includes(currentLocation - 3)) {
      if (this.ratCheck([currentLocation - 1, currentLocation - 2, currentLocation - 3])) {
        return true;
      }
    } else if (!water.includes(newLocation)) {
      if (newLocation === currentLocation + 1 || newLocation === currentLocation - 1 || newLocation === currentLocation + 9 || newLocation === currentLocation - 9) {
        return true;
      }
    }
  } else if (water.includes(newLocation)) {
    if (animal === "rat") {
      if (newLocation === currentLocation + 1 || newLocation === currentLocation - 1 || newLocation === currentLocation + 9 || newLocation === currentLocation - 9) {
        return true;
      } else {
        return false;
      }
    }
  } else if (!water.includes(newLocation)) {
    if (newLocation === currentLocation + 1 || newLocation === currentLocation - 1 || newLocation === currentLocation + 9 || newLocation === currentLocation - 9) {
      return true;
    }
  }
  return false;
}

canCaptureOtherAnimal = (playerAnimalRank, opponentAnimalRank, animalLocation, opponentLocation) => {
  const playerAnimal = parseInt(playerAnimalRank);
  const opponentAnimal = parseInt(opponentAnimalRank);
  const currentPlayerTraps = this.state[(this.state.currentPlayer + 'traps')]
  const opponentTraps = this.state[((this.state.currentPlayer === "p1" ? "p2" : "p1") + 'traps')]
  console.log(playerAnimal, opponentAnimal, typeof playerAnimal, typeof opponentAnimal)
  if (opponentTraps.includes(animalLocation)) {
    return false;
  } else if (currentPlayerTraps.includes(opponentLocation)) {
    return true;
  } else if (playerAnimal === 7 && opponentAnimal === 0) {
    return true;
  } else if (playerAnimal === 0 && opponentAnimal === 7) {
    return false;
  } else if (playerAnimal <= opponentAnimal) {
    return true;
  } else {
    return false;
  }
}

ratCheck = (moveArray) => {
  if (moveArray.includes(this.state.p1.rat) || moveArray.includes(this.state.p2.rat)) {
    return false;
  }
  return true;
}

animalCanJump = (selectedAnimal) => {
  if (selectedAnimal === "lion" || selectedAnimal === "tiger") {
    return true;
  }
  return false;
}

newGame = () => {
  window.location.reload();
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
        <div className="square water" cell={props.square} onClick={this.clickTerrain}>
          <this.Showanimal
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else if (props.p1traps.includes(props.square) || props.p2traps.includes(props.square)) {
      return (
        <div className="square trap" cell={props.square} onClick={this.clickTerrain}>
          <this.Showanimal
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else if (props.p1den === props.square || props.p2den === props.square) {
      return (
        <div className="square den" cell={props.square} onClick={this.clickTerrain}>
          <this.Showanimal
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    } else {
      return (
        <div className="square ground" cell={props.square} onClick={this.clickTerrain}>
          <this.Showanimal
            square={props.square}
            p1={props.p1}
            p2={props.p2}
          />
        </div>
      )
    }
  }

// Chooses which animal to display
  Showanimal = (props) => {
    const location = props.square
    const p1 = props.p1
    const p2 = props.p2



    switch (location) {
      case (p1.elephant):
        return (
          <img src={p1elephant} alt={p1elephant} className='animal' onClick={this.clickAnimal} cell={props.square} animal='elephant' player='p1' />
        );
      case (p1.lion):
        return (
          <img src={p1lion} alt={p1lion} className='animal' onClick={this.clickAnimal} cell={props.square} animal='lion' player='p1' />
        );
      case (p1.tiger):
        return (
          <img src={p1tiger} alt={p1tiger} className='animal' onClick={this.clickAnimal} cell={props.square} animal='tiger' player='p1' />
        );
      case (p1.leopard):
        return (
          <img src={p1leopard} alt={p1leopard} className='animal' onClick={this.clickAnimal} cell={props.square} animal='leopard' player='p1' />
        );
      case (p1.dog):
        return (
          <img src={p1dog} alt={p1dog} className='animal' onClick={this.clickAnimal} cell={props.square} animal='dog' player='p1' />
        );
      case (p1.wolf):
        return (
          <img src={p1wolf} alt={p1wolf} className='animal' onClick={this.clickAnimal} cell={props.square} animal='wolf' player='p1' />
        );
      case (p1.cat):
        return (
          <img src={p1cat} alt={p1cat} className='animal' onClick={this.clickAnimal} cell={props.square} animal='cat' player='p1' />
        );
      case (p1.rat):
        return (
          <img src={p1rat} alt={p1rat} className='animal' onClick={this.clickAnimal} cell={props.square} animal='rat' player='p1' />
        );
      case (p2.elephant):
        return (
          <img src={p2elephant} alt={p2elephant} className='animal' onClick={this.clickAnimal} cell={props.square} animal='elephant' player='p2' />
        );
      case (p2.lion):
        return (
          <img src={p2lion} alt={p2lion} className='animal' onClick={this.clickAnimal} cell={props.square} animal='lion' player='p2' />
        );
      case (p2.tiger):
        return (
          <img src={p2tiger} alt={p2tiger} className='animal' onClick={this.clickAnimal} cell={props.square} animal='tiger' player='p2' />
        );
      case (p2.leopard):
        return (
          <img src={p2leopard} alt={p2leopard} className='animal' onClick={this.clickAnimal} cell={props.square} animal='leopard' player='p2' />
        );
      case (p2.dog):
        return (
          <img src={p2dog} alt={p2dog} className='animal' onClick={this.clickAnimal} cell={props.square} animal='dog' player='p2' />
        );
      case (p2.wolf):
        return (
          <img src={p2wolf} alt={p2wolf} className='animal' onClick={this.clickAnimal} cell={props.square} animal='wolf' player='p2' />
        );
      case (p2.cat):
        return (
          <img src={p2cat} alt={p2cat} className='animal' onClick={this.clickAnimal} cell={props.square} animal='cat' player='p2' />
        );
      case (p2.rat):
        return (
          <img src={p2rat} alt={p2rat} className='animal' onClick={this.clickAnimal} cell={props.square} animal='rat' player='p2' />
        );
      default:
        return props.square
    }
  }

  render() {
    return (
      <div>
        <div className='information-display'>
          Current Turn: {this.state.currentPlayer},
          Current Animal: {this.state.selectedAnimal}
        </div>
        <button type="button" onClick={this.newGame}>Reset</button>
        <header>
        <this.CreateBoard
          board={this.state.board}
          water={this.state.water}
          p1traps={this.state.p1traps}
          p2traps={this.state.p2traps}
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
