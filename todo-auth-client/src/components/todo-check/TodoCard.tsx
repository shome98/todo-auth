import React, { useState } from 'react';
import EditModal from './EditModal';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  //onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoCard: React.FC<Todo> = ({
  title,
  description,
  completed,
  onDelete,
  onToggleComplete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="relative max-w-[600px] w-full p-6 bg-white border rounded-lg shadow-lg transition-shadow hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggleComplete}
            className="mr-2"
          />
          <h3
            className={`text-xl font-semibold ${
              completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {title}
          </h3>
        </div>

        {isHovered && (
          <div className="flex gap-2">
            <button
              onClick={()=>setModalOpen(true)}
              className="p-1 text-blue-500 transition-colors rounded hover:bg-blue-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13h3v3m-2 2l2 2 9-9a2 2 0 00-2.828-2.828l-9 9z"
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-red-500 transition-colors rounded hover:bg-red-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <p
        className={`mt-4 text-gray-600 ${
          completed ? 'line-through' : ''
        } ${isHovered ? 'block' : 'truncate'}`}
      >
        {description}
      </p>
      {/* edit modal here */}
      {isModalOpen && (<EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => { }}
        initialTitle={title}
        initialDescription={description} />)}
    </div>
  );
};

export default TodoCard;