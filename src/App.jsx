import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = () => {
    if (todo.trim() === '') return;
    setTodoList([...todoList, { id: Date.now(), text: todo, completed: false }]);
    setTodo('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <div className="todo-app">
      <h1 className="app-title">To-Do List</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button className="add-btn" onClick={addTodo}>
          Add Task
        </button>
      </div>

      <ul className="todo-list">
        {todoList.map((item) => (
          <li
            key={item.id}
            className={`todo-item ${item.completed ? 'completed' : ''}`}
            onClick={() => toggleComplete(item.id)}
          >
            <span className="todo-text">{item.text}</span>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {todoList.length > 0 && (
        <div className="stats">
          Total tasks: {todoList.length} | Completed: {todoList.filter(item => item.completed).length}
        </div>
      )}
    </div>
  );
};

export default App;