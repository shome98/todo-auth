import React, { useState } from 'react';
import TodoCard from './TodoCard';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // Sample data
  const initialTodos: Todo[] = [
    {
      id: 1,
      title: 'Learn React',
      description: 'Study the React documentation and build a sample project.',
      completed: false,
    },
    {
      id: 2,
      title: 'Grocery Shopping',
      description: 'Buy fruits, vegetables, and snacks for the week.',
      completed: false,
    },
    {
      id: 3,
      title: 'Complete Project',
      description: 'Finish the ongoing project before the deadline.',
      completed: true,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Toggle completion status
  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo item (For simplicity, just updating the title here)
  const editTodo = (id: number) => {
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    }
  };

  // Delete a todo item
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <div className="grid grid-cols-1 gap-6 max-w-[800px] w-full">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onEdit={() => editTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onToggleComplete={() => toggleComplete(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
