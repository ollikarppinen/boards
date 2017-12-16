import React, { Component } from 'react';

import Columns from './Columns';

import './App.css';

const Board = props => {
    return (
        <div className="board">
            <div className="title">{props.board.title}<span onClick={props.onClick}>return</span></div>
            <Columns boardIndex={props.boardIndex}
                     onAdd={props.onAdd}
                     onMove={props.onMove}
                     movingColumnIndex={props.movingColumnIndex}
                     movingTaskIndex={props.movingTaskIndex}
                     {...props.board}
            />
        </div>
    )
};

export default Board;