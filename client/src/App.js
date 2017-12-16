import React, { Component } from 'react';
import update from 'immutability-helper';

import Board from './Board';
import Boards from './Boards';

import './App.css';

export default class App extends Component {
    state = {
        boards: [],
        activeBoardId: null
    };

    componentDidMount() {
        window.fetch('boards')
              .then(response => response.json())
              .then(json => this.setState({ boards: json }))
              .catch(error => console.log(error));
    }

    handleActivateBoard(boardIndex) {
        this.setState({ activeBoardIndex: boardIndex })
    }

    handleResponse(json, boardIndex, columnIndex) {
        // console.log('handleResponse', json, boardIndex, columnIndex);
        if (boardIndex === undefined && columnIndex === undefined) {
            const newBoard = { columns: [], ...json };
            this.setState(update(this.state, {boards: {$push: [newBoard]}}));
        } else if (columnIndex === undefined) {
            const newColumn = { tasks: [], ...json };
            this.setState(update(this.state, {boards: {[boardIndex]: {columns: {$push: [newColumn]}}}}));
        } else if (json.column_id !== undefined) {
            this.setState(update(this.state, {boards: {[boardIndex]: {columns: {[columnIndex]: {tasks: {$push: [json]}}}}}}));
        }
    };

    handleAdd(path, payload, boardIndex, columnIndex) {
        console.log(boardIndex, columnIndex);
        window.fetch(path, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }, })
              .then(response => response.json())
              .then(json => this.handleResponse(json, boardIndex, columnIndex))
              .catch(error => console.log(error));
    }

    render() {
        console.log(this.state);
        // const activeBoardIndex = this.state.boards.findIndex(b => b.id === this.state.activeBoardId);
        const activeBoard = this.state.boards[this.state.activeBoardIndex];
        return (
            activeBoard ?
                <Board board={activeBoard} boardIndex={this.state.activeBoardIndex}  onClick={() => this.setState({ activeBoardIndex: null })} onAdd={this.handleAdd.bind(this)} /> :
                <Boards boards={this.state.boards}  onActivate={this.handleActivateBoard.bind(this)} onAdd={this.handleAdd.bind(this)} />
        );
    }
}