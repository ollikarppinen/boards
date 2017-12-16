import React, { Component } from 'react';
import update from 'immutability-helper';

import Board from './Board';
import Boards from './Boards';

import './App.css';

export default class App extends Component {
    state = {
        boards: [],
        activeBoardId: null,
        movingColumnId: null,
        movingTaskId: null
    };

    componentDidMount() {
        window.fetch('boards')
              .then(response => response.json())
              .then(json => this.setState({ boards: json }))
              .catch(error => console.log(error));
    }

    getObject(columnId, taskId) {
        const columns = this.state.boards.reduce((res, b) => res.concat(b.columns), []);
        const column = columns.find(c => c.id === columnId);
        if (taskId === undefined || taskId === null) return column;
        return column.tasks.find(t => t.id === taskId);
    }

    handleActivateBoard(boardIndex) {
        this.setState({ activeBoardIndex: boardIndex })
    }

    handleMove(targetColumnId, targetTaskId) {
        if (this.state.movingColumnId === null || this.state.movingColumnId === undefined) {
            this.setState({ movingColumnId: targetColumnId, movingTaskId: targetTaskId });
        } else {
            if (targetColumnId === this.state.movingColumnId && targetTaskId === this.state.movingTaskId) {
                this.setState({ movingColumnId: null, movingTaskId: null });
                return;
            };
            const target = this.getObject(targetColumnId, targetTaskId);
            const source = this.getObject(this.state.movingColumnId, this.state.movingTaskId);
            this.setState({ movingColumnId: null, movingTaskId: null });
            // console.log('target', target, 'source', source);
            if (isColumn(source) && isTask(target)) {
                console.log("Column can't move into task");
                return
            }
            let payload;
            let path;
            if (isColumn(source) && isColumn(target)) {
                payload = { column: { board_id: target.board_id, position: target.position } };
                path = 'columns/' + source.id;
            } else if (isTask(source) && isColumn(target)) {
                path = 'tasks/' + source.id;
                payload = { task: { column_id: target.id, position: target.tasks.length } };
            } else if (isTask(source) && isTask(target)) {
                path = 'tasks/' + source.id;
                payload = { task: { column_id: target.column_id, position: target.position } };
            }
            if (!payload || !path) return;
            window.fetch(path, { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }, })
                .then(response => response.json())
                .then(json => this.setState({ boards: json }))
                .catch(error => console.log(error));
        }
    }

    handleResponse(json, boardIndex, columnIndex) {
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
        window.fetch(path, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }, })
              .then(response => response.json())
              .then(json => this.handleResponse(json, boardIndex, columnIndex))
              .catch(error => console.log(error));
    }

    render() {
        console.log('STATE UPDATE', this.state);
        const activeBoard = this.state.boards[this.state.activeBoardIndex];
        const content = activeBoard ?
            <Board board={activeBoard}
                   boardIndex={this.state.activeBoardIndex}
                   onClick={() => this.setState({ activeBoardIndex: null })}
                   onAdd={this.handleAdd.bind(this)}
                   onMove={this.handleMove.bind(this)}
                   movingColumnId={this.state.movingColumnId}
                   movingTaskId={this.state.movingTaskId}
            /> :
            <Boards boards={this.state.boards}
                    onActivate={this.handleActivateBoard.bind(this)}
                    onAdd={this.handleAdd.bind(this)}
            />;

        return (
            <div className="app">
                {content}
                {this.state.movingColumnId !== null && this.state.movingColumnId !== undefined ?
                    <MoveNotification movingColumnId={this.state.movingColumnId}
                                      movingTaskId={this.state.movingTaskId}
                                      cancelMove={() => this.setState({ movingTaskId: null, movingColumnId: null })}
                    />: null}
            </div>
        );
    }
}

const isColumn = obj => Object.keys(obj).includes('board_id');
const isTask = obj => Object.keys(obj).includes('column_id');

const MoveNotification = props => {
    return (
        <div className="move-overlay"  onClick={props.cancelMove}>
            <div>Move target</div>
            <div>Column: {props.movingColumnId}</div>
            {props.movingTaskId !== null && props.movingTaskId !== undefined ? <div>Task: {props.movingTaskId}</div>: null}
        </div>
    )
};