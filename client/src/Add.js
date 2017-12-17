import React, { Component } from 'react';

import './App.css';

export default class Add extends Component {
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
                     columnIndex={this.props.columnIndex}
                     boardIndex={this.props.boardIndex}
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
        if (this.state.inputValue.trim().length === 0) return;
        const payload = {};
        payload[this.props.target] = { ...this.props.payload, title: this.state.inputValue };
        this.props.onAdd(this.props.path, payload, this.props.boardIndex, this.props.columnIndex);
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