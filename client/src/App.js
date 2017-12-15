import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        boards: [],
        activeBoard: null
    };

    componentDidMount() {
        window.fetch('boards')
              .then(response => response.json())
              .then(json => this.setState({ boards: json }))
              .catch(error => console.log(error))
    }

    handleActivateBoard(board) {
        console.log(board);
        this.setState({ activeBoard: board })
    }

    render() {
        console.log(this.state);
        return (
            this.state.activeBoard ?
                <Board board={this.state.activeBoard} onClick={() => this.setState({ activeBoard: null })} /> :
                <Boards boards={this.state.boards}  onActivate={this.handleActivateBoard.bind(this)} />
        );
    }
}

const Boards = props => {

    return (
        <div className="boards">
            <h1>Boards</h1>
            <div className="board-buttons">
                {props.boards.map(board =>
                    <BoardButton key={board.id} onActivate={() => props.onActivate(board)} {...board} />)}
                <CreateBoardButton />
            </div>
        </div>
    )
};

const BoardButton = props => {
    return (
        <div onClick={props.onActivate} className="board-button">
            {props.title}
        </div>
    )
};

const CreateBoardButton = props => {
    return <div className="board-button create-board-button">Create a new table...</div>
};

const Board = props => {
    return (
        <div className="board">
            <div className="board-title">{props.board.title}<span onClick={props.onClick}>return</span></div>
            <Columns columns={props.board.columns}/>
        </div>
    )
};

const Columns = props => {

    return (
        <div className="columns">
            {props.columns.map(column => <Column key={column.id} {...column} />)}
            <div className="column"><div className="column-content add-column-button"><footer>Add column...</footer></div></div>
        </div>
    )
};

const Column = props => {
    const tasks = props.tasks.length > 0 ?
        <ul>{props.tasks.map(task => <Task key={task.id} {...task} />)}</ul>: null;
    return (
        <div className="column">
            <div className="column-content">
                <header className="column-title">{props.title}</header>
                {tasks}
                <footer>Add task...</footer>
            </div>
        </div>
    )
};

const Task = props => {
    return (
        <li className="task">{props.title}</li>
    )
};

export default App;