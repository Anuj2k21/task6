// Todo.js
import React from "react";
import styled from "styled-components";

const StyledTodo = styled.div`
  border: 1px solid #ddd;
  padding: 12px;
  draggable: true;
  margin-bottom: 12px;
`;

const Todo = ({ todo, onDragStart, className }) => {
  return (
    <StyledTodo
      draggable
      onDragStart={(e) => onDragStart(e, todo)}
      className={className}
    >
      <div style={{ fontWeight: '900', }}>  <strong style={{ color: 'red' }}>{todo.title}</strong>
        <hr />
        <p>{todo.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>  <p>Due: {todo.dueDate}</p>
          <p >Priority: <span style={{ color: 'green' }}>{todo.priority}</span></p></div>
      </div>

    </StyledTodo>
  );
};

export default Todo;
