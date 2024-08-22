import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(response => response.json()) 
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(response => response.json())
      .then(todo => setTodos([...todos, todo]));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
