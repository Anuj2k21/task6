// TodoApp.js
import React, { useState } from "react";
import TodoList from "./TodoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TodoApp.css";

const priorities = ["High", "Medium", "Low"];

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "High", // Default priority
  });

  const handleDragStart = (event, todo) => {
    event.dataTransfer.setData("text/plain", todo.id.toString());
  };

  const handleDrop = (event, priority) => {
    const todoId = parseInt(event.dataTransfer.getData("text/plain"));
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, priority };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description || !newTodo.dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length + 1,
        ...newTodo,
      },
    ]);
    setNewTodo({
      title: "",
      description: "",
      dueDate: "",
      priority: "High",
    });
  };

  return (
    <DndProvider backend={HTML5Backend} >

      <div className="TodoForm">
        <form onSubmit={handleSubmit} >
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              name="description"
              value={newTodo.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
            />
          </label>

          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={newTodo.dueDate}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Priority:
            <select
              name="priority"
              value={newTodo.priority}
              onChange={handleInputChange}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div className='todolist'> {priorities.map((priority) => (
        <div
          key={priority}
          onDrop={(e) => handleDrop(e, priority)}
          onDragOver={(e) => e.preventDefault()}

        >

          <h2>{priority} Priority</h2>
          <TodoList
            todos={todos.filter((todo) => todo.priority === priority)}
            onDragStart={handleDragStart}
          />
        </div>
      ))}</div>

    </DndProvider>
  );
};

export default TodoApp;
