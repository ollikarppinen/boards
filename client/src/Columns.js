import React from 'react';

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
                        movingColumnId={props.movingColumnId}
                        movingTaskId={props.movingTaskId}
                />
            )}
            <div className="column">
                <div className="column-content add-column-button">
                    <Add onAdd={props.onAdd}
                         boardIndex={props.boardIndex}
                         payload={{ board_id: props.id, position: props.columns.length }}
                         target="column"
                         path="columns"
                    />
                </div>
            </div>
        </div>
    )
};

const Column = props => {
    const isMoving = props.movingColumnId === props.id && props.movingTaskId === undefined;
    const tasks = props.tasks.length > 0 ?
        <ul>
            {props.tasks.map((task, taskIndex)=>
                <Task key={task.id}
                      isMoving={props.movingColumnId === props.id && props.movingTaskId === task.id}
                      onClick={() => props.onMove(props.id, task.id)}
                      {...task}
                />)}
        </ul>: null;
    return (
        <div className="column">
            <div className={'column-content' + (isMoving ? ' moving' : '')}>
                <header className="column-title" onClick={() => props.onMove(props.id)}>{props.title}</header>
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