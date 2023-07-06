import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import sunIcon from "../images/icon-sun.svg";
import moonIcon from "../images/icon-moon.svg";

function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: "This is my text" }]);

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todo-items"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  // Add a new todo
  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    localStorage.setItem("todo-items", JSON.stringify(newTodos));
    let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    setTodos(savedTodos);
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let prev = todos;
    prev.map((item) => {
      if (item.id == todoId) {
        item.text = newValue.text;
      }
    });
    localStorage.setItem("todo-items", JSON.stringify(prev));
    let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    setTodos(savedTodos);
  };

  const removeTodo = async (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    localStorage.setItem("todo-items", JSON.stringify(removedArr));
    let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    setTodos(savedTodos);
  };

  const completeTodo = async (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    localStorage.setItem("todo-items", JSON.stringify(updatedTodos));
    let savedTodos = await JSON.parse(localStorage.getItem("todo-items"));
    setTodos(savedTodos);
  };
  let [theme, setTheme] = useState("dark-theme");
  useEffect(() => {}, []);
  const toggleTheme = () => {
    theme == "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };
  useEffect(() => {
    let body = document.body;
    body.className = theme;
  }, [theme]);
  return (
    <>
      <div className="todo-header">
        <h1>TODO</h1>
        <div className="themeToggle" onClick={toggleTheme}>
          <img src={theme == "dark-theme" ? sunIcon : moonIcon} />
        </div>
      </div>
      <TodoForm onSubmit={addTodo} />
      <div className="todo-list">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </>
  );
}

export default TodoList;
