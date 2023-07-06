import React from "react";
import "./style.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <header></header>
      <div className="todo-app">
        <TodoList />
      </div>
    </>
  );
}

export default App;
