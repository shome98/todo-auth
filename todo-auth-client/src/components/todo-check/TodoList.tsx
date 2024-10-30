import React, { useEffect, useState, } from 'react';
import TodoCard from './TodoCard';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { fetchTodos, removeExistingTodo, toggleTodoComplete } from '../../slices/todoSlice';
import { AddModal } from './AddModal';

// interface Todo {
//   _id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }

const TodoList: React.FC = () => {
  // Sample data
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const auth = useSelector((state: RootState) => state.auth)
  const { isAuthenticated } = auth;
  const [isAddOpen,setAddOpen]=useState(false);
  const [isChanged,setIsChanged]=useState(0);
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch,isChanged])
  
  const toggleComplete = async (id:string, completed:boolean) => {
    await dispatch(toggleTodoComplete({id,completed}));
    setIsChanged(isChanged+1);
  }
  const handleDeleteTodo = async (id: string) => {
    await dispatch(removeExistingTodo(id));
    setIsChanged(isChanged+1);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Todo List is { isAuthenticated ?"authenticated":"not authenticated"}</h1>
      <button onClick={()=>setAddOpen(true)} className="p-1 text-blue-500 transition-colors rounded hover:bg-red-100 focus:outline-none">Add new Todo</button>
      <div className="grid grid-cols-1 gap-6 max-w-[800px] w-full">
        {todos.length>0&&todos.map((todo) => (
          <TodoCard
            key={todo._id}
            title={todo.title}
            description={todo.description || ""}
            completed={todo.completed}
            //onEdit={() => editTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo._id)}
            onToggleComplete={() => toggleComplete(todo._id, !todo.completed)}
              id={todo._id}
          />
        ))}
      </div>
      {isAddOpen&&<AddModal
      onClose={()=>setAddOpen(false)}
      onSave={()=>setAddOpen(false)}/>}
    </div>
  );
};

export default TodoList;
