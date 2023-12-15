// TodoList.js
import React from "react";
import Todo from "./Todo";
import styled from "styled-components";
import "./TodoList.css";

const StyledTodoList = styled.div`
  margin-top: 20px;
`;

const StyledTodo = styled(Todo)`
  border: 10px solid black;
  padding: 12px;
  margin-bottom: 12px;
  font-weight: 600;
  background-color: ${(props) => getBackgroundColor(props.priority)};
`;

const getBackgroundColor = (priority) => {
  switch (priority) {
    case "High":
      return "#ffcccc"; // Red
    case "Medium":
      return "#fff7cc"; // Yellow
    case "Low":
      return "#ccffcc"; // Green
    default:
      return "#fff";
  }
};

const TodoList = ({ todos, onDragStart }) => {
  return (
    <StyledTodoList className="Todo DragOver">
      {todos.map((todo) => (
        <StyledTodo key={todo.id} todo={todo} onDragStart={onDragStart} />
      ))}
    </StyledTodoList>
  );
};

export default TodoList;
