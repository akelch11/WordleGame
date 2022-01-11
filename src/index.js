import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var cg = "";
var pg = "";
var guesses = 0;
var guessHistory = [];


class Square extends React.Component {
  
  constructor(props)
  {
    super(props);

    this.squareNum;
  }

  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, row) {
    // console.log("square " + (5 * row + i) + " created");

    var val;
    
    if (row < guesses)
      val = guessHistory[row].charAt(i).toLowerCase();
  
    return <Square value = {val} row = {row} id = {5 * row+ i}/>;
  }

  renderRow(rowId) {

    console.log(guesses);
    return (

      <div className="board-row">
          {this.renderSquare(0, rowId)}
          {this.renderSquare(1, rowId)}
          {this.renderSquare(2, rowId)}
          {this.renderSquare(3, rowId)}
          {this.renderSquare(4, rowId)}
      </div>
    )


  }

  render() {
    const title = "Welcome to the Wordle Game!";

    return (
      <div>
        <div className="status">{title}</div>
          {this.renderRow(0)}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
  
          <div> 
            <p>
              Instructions: Welcome to Wordle! This is a word game <br></br>
               where you have 6 tries to guess a 5 letter word. <br></br>

               After each guess, the color of the tiles will change to give <br></br>
                clues about the remaining letters in the word. <br></br>
               <br></br>

               A green box means the letter is in the word <br></br>
               and in the correct spot.
            
               <br></br>
               A yellow box means the letter is in the word and <br></br>
              in a different spot.

               <br></br>
               A gray box means the letter is not in the word.

        
            </p>
          </div>
      </div>
      
    );
  }
}

class Game extends React.Component {
  
  constructor(props)
  {
    super(props);

    let possibleWords = ["dicey", "chick", "bloop"]; 
    let rand = Math.floor(Math.random() * possibleWords.length);


    this.state =  {

      guesses: 0,
      correct: false,
      word: possibleWords[rand],
      guessedLetters: Array(26).fill(null),
      currentGuess: "     ",
      history: Array(6).fill(null),
    };

  }

  handleGuess() {
    
    let userGuess = document.getElementById("guessBox").value;

    
    if(userGuess.length == 5)
    { 
      
      for(let i = 0; i < userGuess.length; i++) {

        let letter = userGuess.charAt(i).toLowerCase();
        //console.log(letter);
        // register letter as being used
        if(isLetter(letter))
          this.state.guessedLetters[letter.charCodeAt(0) - 'a'.charCodeAt(0)] = letter;

      }
      guessHistory.push(userGuess);

      this.setState({

        currentGuess: userGuess,
        guesses: this.state.guesses + 1,
        correct: this.state.currentGuess == this.state.word,
        history: guessHistory,
        });

      cg = this.getCurrentGuess();
      guesses++;
    }
    else 
      return;
    
      
    
    
    return;
  }

  getCurrentGuess()
  {
    return this.state.currentGuess;
  }


  
  render() {

    let usedLetters = usedLettersToString(this.state.guessedLetters); 

        

    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>
            {/* status */}
            <h5> GUESS A WORD HERE:</h5>
            <input type = "text" id = "guessBox"/>
            <button type = "submit" className = "spacing"  onClick = {this.handleGuess.bind(this)}>
               Enter Guess 
            </button> 
          </div>
          <ol>{/* TODO */} </ol>

          <p> Used Letters: <br></br>
              {usedLetters}
          </p>

          
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function isLetter(c)
{
  return c.toLowerCase() != c.toUpperCase();
}

console.log(cg);

function usedLettersToString(letters)
{
  let usedLetters = ""; 
  let count = 0;
    for(let i = 0; i < letters.length; i++)
    { 
       if(letters[i] != null)
        { 
          usedLetters += (letters[i] + " ");
          count++;
        }
    }

    return usedLetters;
}

console.log(guessHistory.toString());
