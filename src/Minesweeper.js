import React, { Component } from 'react';

const BASE_URL = 'https://minesweeper-api.herokuapp.com/'

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                board: []
                gameId: '',
                difficulty: 0
            }
        }
    }

    componentDidMount() {
        // create the board
        fetch(BASE_URL + "games", {
            method: "POST",
            body: JSON.stringify({ difficulty: 0 })
        })
        
        .then(resp => resp.json())
            .then(newGame => {
                // console.log("game", newGame);
                this.setState({
                    game: newGame
                    gameId: newGame.id
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



    render() {
        return (
            <div>
                
                currently playing   {this.state.game.id}

                {this.state.game.board.map((row, i) => {
                    console.log("row", row, i)
                    return (
                        <div class ="container">
                            
                            {row.map((col, j) => {
                                return <span className="square">
                                    {this.state.game.board[i][j]}
                                {/* {`${i}, ${j}`} */}
                                </span>
                            })}
                        </div>
                    )
                    return
                })}
            </div>
        );
    }
}

export default Minesweeper;



