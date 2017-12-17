import React from 'react';
import './App.css';

const Task = props => {
    const classNames = "task" + (props.isMoving ? ' moving' : '');
    return (
        <li className={classNames} onClick={props.onClick}>{props.title}</li>
    )
};

export default Task;