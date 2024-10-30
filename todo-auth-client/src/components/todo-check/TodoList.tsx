import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchTodos, removeExistingTodo, toggleTodoComplete } from '../../slices/todoSlice';
import { AddModal } from './AddModal';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [allCount, setAllCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isAddOpen, setAddOpen] = useState(false);
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(0);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch,isChanged]);

  useEffect(() => {
    // Update counts based on the latest todos
    setAllCount(todos.length);
    setPendingCount(todos.filter(todo => !todo.completed).length);
    setCompletedCount(todos.filter(todo => todo.completed).length);
  }, [todos,isChanged]);

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
  };

  const getDisplayedTodos = () => {
    switch (currentCategory) {
      case 'Pending':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await dispatch(removeExistingTodo(id));
    setIsChanged(prev=>prev+1)
  };

  const handleToggleComplete = async (id:string, completed:boolean) => {
    await dispatch(toggleTodoComplete({id,completed}));
    setIsChanged(isChanged+1);
  }

  const handleLogout = async() => {
    // handle logout logic here
    await dispatch(logout());
        navigate('/logged-out');
  };

  return (
    <div>
      <Navbar
        allCount={allCount}
        pendingCount={pendingCount}
        completedCount={completedCount}
        onCategorySelect={handleCategorySelect}
        onLogout={handleLogout}
        selectedCategory={currentCategory}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/*<h1 className="text-2xl font-bold mb-6">{currentCategory} Todos</h1>*/}
        <button onClick={() => setAddOpen(true)} className="ml-auto px-5 py-2 my-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700 hover:border-blue-700">
          Add new Todo
        </button>
        <div className="grid grid-cols-1 gap-6 max-w-[800px] w-full">
          {getDisplayedTodos().map(todo => (
            <TodoCard
              key={todo._id}
              title={todo.title}
              description={todo.description || ''}
              completed={todo.completed}
              onDelete={() => handleDeleteTodo(todo._id)}
              onToggleComplete={() => handleToggleComplete(todo._id, !todo.completed)}
              id={todo._id}
            />
          ))}
        </div>
        {isAddOpen && (
          <AddModal onClose={() => setAddOpen(false)} onSave={() => setAddOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default TodoList;
