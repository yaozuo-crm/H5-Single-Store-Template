import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTodo} from 'ACTION';

const AddTodo1 = ({dispatch}) => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = '';
      }}
      >
        <input ref={node => {
          input = node;
        }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};
const AddTodo = connect()(AddTodo1);

AddTodo1.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddTodo;
