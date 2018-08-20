import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: [],
                gameId: '',
                difficulty: 0,
                message: ''
            }
        }
    }

    displayGameresult () {

    }

    componentDidMount() {
        // create the board
        fetch(`${BASE_URL}/games`, {
            method: "POST",
            body: JSON.stringify({ difficulty: 0 }),
            headers:{ 
                'Content:Type': 'application/json' }
        })
                .then(resp => resp.json())
                .then(newGame => {
                    this.setState({
                        game: newGame
                })
            })
    }

    //game pieces
    renderCells = (row, column) => {
        if (this.state.game.board[row][column] === "_") {
            return "◻️"
        }
        else if (this.state.game.board[row][column] === "F") {
            return "🚩"
        }
        else if (this.state.game.board[row][column] === "*") {
            return "💣"
        }
        else {
            return this.state.game.board[row][column]
        }
    }

    //game event when clicked
    clickedSquare = (row, column) => {
        fetch(`${BASE_URL}games/${this.state.gameId}/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "row": row,
                "col": column
            })
        })

        .then(resp => resp.json())
        .then(newGame => {
            this.setState({
                game: newGame
            })
            if (this.state.game.state === "lost") {
                console.log('You Lose!')
            }
            else if (this.state.game.state === "won") {
                console.log('You Won!')
            }
        })
        .catch(console.error)
    }

    flaggedSquare = (event , row, column) => {
        event.preventDefault()
        fetch(`${BASE_URL}/games/${this.state.gameId}/flag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "row": row,
                "col": column
            })
        })

        .then(resp => resp.json())
        .then(newGame => {
            this.setState({
                game: newGame
            })
        })
    }

    
    render() {
        return (
            <div>
            <h1>{this.state.message}</h1>
            <div className='Result'>{this.state.game.state}</div>
              <div>
                <div className='Difficulty-Menu'>
                    <select>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <button className='Restart-Button'>Restart</button>
                </div>
              </div>
              <div className='Board'>
                <div className='Board-Border'>
                    {this.state.game.board.map((row, i) => {
                        return (
                            <div key={i} className='row square'>
                                {row.map((col, j) => {
                                    return (
                                        <span key={j}
                                        className='column square'
                                        onClick={() => this.clickedSquare(i, j)}
                                        onContextMenu={(event) => this.flaggedSquare(event, i, j)}>
                                          {this.renderCells(i, j)}
                                        </span>
                                    )
                                })}
                            </div>
                        )
                    })}  
                </div>
              </div>
            </div>
        );
    }
}


export default Minesweeper;



