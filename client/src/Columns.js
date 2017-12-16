import React, { Component } from 'react';

import Add from './Add';
import Task from './Task';

import './App.css';

const Columns = props => {
    return (
        <div className="columns">
            {props.columns.map((column, columnIndex) => <Column key={column.id} {...column} onAdd={props.onAdd} boardIndex={props.boardIndex} columnIndex={columnIndex} />)}
            <div className="column">
                <div className="column-content add-column-button">
                    <Add onAdd={props.onAdd} boardIndex={props.boardIndex} payload={{ board_id: props.id }} target="column" path="columns" />
                </div>
            </div>
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
                <Add onAdd={props.onAdd} payload={{ column_id: props.id }} target="task" path="tasks" boardIndex={props.boardIndex} columnIndex={props.columnIndex} />
            </div>
        </div>
    )
};

export default Columns;