import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


var cg = "";
var pg = "";
var guesses = 0;
var guessHistory = [];
var tileColorStatuses = Array(6);









class Square extends React.Component {
  
  constructor(props)
  {
    super(props);

    this.squareNum;
  }

  render() {

    // apply square and appropriate color classes to each box
    var cn = "square " + this.props.color;
    

    return (
      <button className= {cn}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, row) {
    // console.log("square " + (5 * row + i) + " created");

    var val;
    var color = "";
    
    if (row < guesses)
      val = guessHistory[row].charAt(i).toLowerCase();
    
      // console.log(tileColorStatuses[row][i]);
    if(row < guesses)
      color = tileColorStatuses[row][i];
      
      return <Square value = {val} row = {row} id = {5 * row+ i} color = {color} />;
    

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
  
    return (
      <div>
        <div className="status"></div>
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

    let possibleWords = ["admit", "adopt", "agree", "allow", "alter", "apply", "argue", "arise", "avoid", "begin", "blame", "break", 
                         "bring", "build", "burst", "carry", "catch", "cause", "check", "claim", "clean", "clear", "climb", "close", 
                         "count", "cover", "cross", "dance", "doubt", "drink", "drive", "enjoy", "enter", "exist", "fight", "focus", 
                         "force", "guess", "imply", "issue", "judge", "laugh", "learn", "leave", "let’s", "limit", "marry", "match", 
                         "occur", "offer", "order", "phone", "place", "point", "press", "prove", "raise", "reach", "refer", "relax", 
                         "serve", "shall", "share", "shift", "shoot", "sleep", "solve", "sound", "speak", "spend", "split", "stand", 
                         "start", "state", "stick", "study", "teach", "thank", "think", "throw", "touch", "train", "treat", "trust", 
                         "visit", "voice", "waste", "watch", "worry", "would", "write", "abuse", "adult", "agent", "anger", "apple",
                         "award", "basis", "beach", "birth", "block", "blood", "board", "brain", "bread", "break", "brown", "buyer", 
                         "cause", "chain", "chair", "chest", "chief", "child", "china", "claim", "class", "clock", "coach", "coast",
                         "court", "cover", "cream", "crime", "cross", "crowd", "crown", "cycle", "dance", "death", "depth", "doubt",
                         "draft", "drama", "dream", "dress", "drink", "drive", "earth", "enemy", "entry", "error", "event", "faith",
                         "fault", "field", "fight", "final", "floor", "focus", "force", "frame", "frank", "front", "fruit", "glass",
                         "grant", "grass", "green", "group", "guide", "heart", "henry", "horse", "hotel", "house", "image", "index",
                         "input", "issue", "japan", "jones", "judge", "knife", "laura", "layer", "level", "lewis", "light", "limit",
                         "lunch", "major", "march", "match", "metal", "model", "money", "month", "motor", "mouth", "music", "night",
                         "noise", "north", "novel", "nurse", "offer", "order", "other", "owner", "panel", "paper", "party", "peace",
                         "peter", "phase", "phone", "piece", "pilot", "pitch", "place", "plane", "plant", "plate", "point", "pound",
                         "power", "press", "price", "pride", "prize", "proof", "queen", "radio", "range", "ratio", "reply", "right",
                         "river", "round", "route", "rugby", "scale", "scene", "scope", "score", "sense", "shape", "share", "sheep",
                         "sheet", "shift", "shirt", "shock", "sight", "simon", "skill", "sleep", "smile", "smith", "smoke", "sound",
                         "south", "space", "speed", "spite", "sport", "squad", "staff", "stage", "start", "state", "steam", "steel",
                         "stock", "stone", "store", "study", "stuff", "style", "sugar", "table", "taste", "terry", "theme", "thing",
                         "title", "total", "touch", "tower", "track", "trade", "train", "trend", "trial", "trust", "truth", "uncle",
                         "union", "unity", "value", "video", "visit", "voice", "waste", "watch", "water", "while", "white", "whole",
                         "woman", "world", "youth"
                        ];
    let rand = Math.floor(Math.random() * possibleWords.length);


    this.state =  {

      guesses: 0,
      correct: false,
      word: possibleWords[rand],
      guessedLetters: Array(26).fill(null),
      currentGuess: "     ",
      history: Array(6).fill(null),
      tileColors: Array(6),
      
      
    };

  }

  handleGuess() {
    
    let userGuess = document.getElementById("guessBox").value;
    let colors = Array(5);
    
    if(userGuess.length == 5)
    { 
      
      for(let i = 0; i < userGuess.length; i++) {

        let letter = userGuess.charAt(i).toLowerCase();
        //console.log(letter);
        // register letter as being used
        if(isLetter(letter))
          this.state.guessedLetters[letter.charCodeAt(0) - 'a'.charCodeAt(0)] = letter;

        if(letter == this.state.word.charAt(i))
          colors[i] = "green";
        else if(this.state.word.indexOf(letter) >= 0)
          colors[i] = "yellow";
        else 
          colors[i] = "gray"; 

      }

      guessHistory.push(userGuess);
      tileColorStatuses[this.state.guesses] = colors;

      this.setState({

        currentGuess: userGuess,
        guesses: this.state.guesses + 1,
        correct: userGuess == this.state.word,
        history: guessHistory,
        tileColors: tileColorStatuses,

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
    let win = this.state.correct;
    let titleClass = "";
    let status;
    

    if(win && this.state.guesses < 6)
      {
         status = "Congratulations! You guessed the word!";
         titleClass = "winFont"
     }
    else
      {
        if(this.state.guesses < 6)
          status = "Welcome to the Wordle Game!";
        else
          {
            status = "Sorry, you did not guess the word!";
            titleClass = "loseFont";
          }
      }
        

    return (
      <div className="game">
        <div className="game-board">
          <h2 className = {titleClass}>{status}</h2>
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
