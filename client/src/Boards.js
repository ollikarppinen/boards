import React, { Component } from 'react';

import Add from './Add';

import './App.css';

const Boards = props => {
    return (
        <div className="boards">
            <div className="title">Boards</div>
            <div className="board-buttons">
                {props.boards.map((board, index) =>
                    <BoardButton key={board.id} onClick={() => props.onActivate(index)} {...board} />)}
                <div className="add-board big-button">
                    <Add onAdd={props.onAdd} payload={{}} target="board" path="boards" />
                </div>
            </div>
        </div>
    )
};

const BoardButton = props => {
    return (
        <div onClick={props.onClick} className="board-button big-button">
            {props.title}
        </div>
    )
};

export default Boards;