import React, { Component } from 'react';

import Add from './Add';
import Task from './Task';

import './App.css';

const Columns = props => {
    return (
        <div className="columns">
            {props.columns.map((column, columnIndex) =>
                <Column key={column.id} {...column}
                        onAdd={props.onAdd}
                        boardIndex={props.boardIndex}
                        columnIndex={columnIndex}
                        onMove={props.onMove}
                />
            )}
            <div className="column">
                <div className="column-content add-column-button">
                    <Add onAdd={props.onAdd} boardIndex={props.boardIndex} payload={{ board_id: props.id, position: props.columns.length }} target="column" path="columns" />
                </div>
            </div>
        </div>
    )
};

const Column = props => {
    const tasks = props.tasks.length > 0 ?
        <ul>
            {
                props.tasks.map(
                    (task, taskIndex)=>
                        <Task key={task.id}
                              onClick={() => props.onMove(props.columnIndex, taskIndex)}
                              {...task}
                        />
                )
            }
        </ul>: null;
    return (
        <div className="column">
            <div className="column-content">
                <header className="column-title" onClick={() => props.onMove(props.columnIndex)}>{props.title}</header>
                {tasks}
                <Add onAdd={props.onAdd}
                     payload={{ column_id: props.id, position: props.tasks.length }}
                     target="task"
                     path="tasks"
                     boardIndex={props.boardIndex}
                     columnIndex={props.columnIndex}
                />
            </div>
        </div>
    )
};

export default Columns;