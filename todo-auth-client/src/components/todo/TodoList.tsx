import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchTodos, removeExistingTodo, toggleTodoComplete } from '../../slices/todoSlice';
import { AddModal } from './AddModal';
import toast from 'react-hot-toast';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [allCount, setAllCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(0);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, isChanged]);

  useEffect(() => {
    // Update counts based on the latest todos
    setAllCount(todos.length);
    setPendingCount(todos.filter(todo => !todo.completed).length);
    setCompletedCount(todos.filter(todo => todo.completed).length);
  }, [todos, isChanged]);

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
    const status = await dispatch(removeExistingTodo(id));
    if (status.meta.requestStatus === "fulfilled") {
      setIsChanged(prev => prev + 1);
      toast.success(`Successfully deleted the todo!!!`);
      return;
    }
    toast.error("Could not delete the todo!!!");
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const status = await dispatch(toggleTodoComplete({ id, completed }));
    if (status.meta.requestStatus === "fulfilled") {
      setIsChanged(isChanged + 1);
      if (completed) toast.success("Successfully completed the todo!!!");
      else toast.success("Successfully undone the todo!!!");
      return;
    }
    toast.error("Could not complete the todo!!!");
  };

  // const handleLogout = async () => {
  //   const status = await dispatch(logout());
  //   if (status.meta.requestStatus === "fulfilled") {
  //     toast.success("You are logged out!!!");
  //     navigate('/');
  //     return;
  //   }
  //   toast.error("Could not log you out!!!");
  // };

  return (
    <div className='flex flex-col justify-items-center max-h-full max-w-full'>
      <Navbar
        allCount={allCount}
        pendingCount={pendingCount}
        completedCount={completedCount}
        onCategorySelect={handleCategorySelect}
        selectedCategory={currentCategory}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <button 
          onClick={() => setAddOpen(true)} 
          className="ml-auto px-5 py-2 my-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700 hover:border-blue-700"
        >
          Add new Todo
        </button>
        <div className="grid grid-cols-1 gap-6 max-w-[800px] w-full">
          {getDisplayedTodos().length > 0 ? (
            getDisplayedTodos().map(todo => (
              <TodoCard
                key={todo._id}
                title={todo.title}
                description={todo.description || ''}
                completed={todo.completed}
                onDelete={() => handleDeleteTodo(todo._id)}
                onToggleComplete={() => handleToggleComplete(todo._id, !todo.completed)}
                id={todo._id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg text-gray-700">
              <p className="text-lg">No todos are available.</p>
              <p className="text-sm">Start by adding a new todo!</p>
            </div>
          )}
        </div>
        {isAddOpen && (
          <AddModal onClose={() => setAddOpen(false)} onSave={() => setAddOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default TodoList;
