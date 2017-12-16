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
              .catch(error => console.log(error));
    }

    handleActivateBoard(board) {
        this.setState({ activeBoard: board })
    }

    handleAdd(path, payload) {
        window.fetch(path, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }, })
              .then(response => response.json())
              .then(json => console.log(json))
              .catch(error => console.log(error));
    }

    render() {
        console.log(this.state);
        return (
            this.state.activeBoard ?
                <Board board={this.state.activeBoard} onClick={() => this.setState({ activeBoard: null })} onAdd={this.handleAdd.bind(this)} /> :
                <Boards boards={this.state.boards}  onActivate={this.handleActivateBoard.bind(this)} onAdd={this.handleAdd.bind(this)} />
        );
    }
}

const Boards = props => {

    return (
        <div className="boards">
            <div className="title">Boards</div>
            <div className="board-buttons">
                {props.boards.map(board =>
                    <BoardButton key={board.id} onActivate={() => props.onActivate(board)} {...board} />)}
                <div className="add-board big-button">
                    <Add onAdd={props.onAdd} payload={{}} target="board" path="boards" />
                </div>
            </div>
        </div>
    )
};

const BoardButton = props => {
    return (
        <div onClick={props.onActivate} className="board-button big-button">
            {props.title}
        </div>
    )
};

const CreateBoardButton = props => {
    return <Add onAdd={props.onAdd} payload={{ column_id: props.id }} target="task" path="tasks" />
};

const Board = props => {
    return (
        <div className="board">
            <div className="title">{props.board.title}<span onClick={props.onClick}>return</span></div>
            <Columns {...props.board} onAdd={props.onAdd} />
        </div>
    )
};

const Columns = props => {
    console.log(props)
    return (

        <div className="columns">
            {props.columns.map(column => <Column key={column.id} {...column} onAdd={props.onAdd} />)}
            <div className="column"><div className="column-content add-column-button">
                <Add onAdd={props.onAdd} payload={{ board_id: props.id }} target="column" path="columns" />
            </div></div>
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
                <Add onAdd={props.onAdd} payload={{ column_id: props.id }} target="task" path="tasks" />
            </div>
        </div>
    )
};

const Task = props => {
    return (
        <li className="task">{props.title}</li>
    )
};

class Add extends Component {
    state = {
        active: false
    };

    render() {
        return this.state.active ?
            <AddForm onAdd={this.props.onAdd}
                     onClose={() => this.setState({ active: false })}
                     target={this.props.target}
                     path={this.props.path}
                     payload={this.props.payload}
            />: <AddButton onClick={() => this.setState({ active: true })} target={this.props.target} />;
    }
}

const AddButton = props => {
    return <div onClick={props.onClick} className={"add-button"}>{`Add ${props.target}...`}</div>;
};

class AddForm extends Component {
    state = {
        inputValue: ''
    };

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    onSubmit() {
        const payload = {};
        payload[this.props.target] = { ...this.props.payload, title: this.state.inputValue };
        this.props.onAdd(this.props.path, payload);
        this.props.onClose();
    }

    render() {
        return (
            <div className="add-form">
                <input autoFocus value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} type="text" name="name" className="add-input" />
                <span onClick={this.onSubmit.bind(this)} className="add-form-button add-submit">Add</span>
                <span onClick={this.props.onClose}className="add-form-button add-close">Close</span>
            </div>
        );
    }
}

export default App;