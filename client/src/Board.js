import React, { Component } from 'react';

import Columns from './Columns';

import './App.css';

const Board = props => {
    return (
        <div className="board">
            <div className="title">{props.board.title}<span onClick={props.onClick}>return</span></div>
            <Columns boardIndex={props.boardIndex}{...props.board} onAdd={props.onAdd} onMove={props.onMove} />
        </div>
    )
};

export default Board;