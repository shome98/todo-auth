// import React, { useState } from 'react';

// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
//   onEdit: () => void;
//   onDelete: () => void;
//   onToggleComplete: () => void;
// }

// const TodoCard: React.FC<Todo> = ({
//   title,
//   description,
//   completed,
//   onEdit,
//   onDelete,
//   onToggleComplete,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative max-w-[600px] w-full p-6 bg-white border rounded-lg shadow-lg transition-shadow hover:shadow-xl"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex justify-between items-start">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={completed}
//             onChange={onToggleComplete}
//             className="mr-2"
//           />
//           <h3
//             className={`text-xl font-semibold ${
//               completed ? 'line-through text-gray-400' : ''
//             }`}
//           >
//             {title}
//           </h3>
//         </div>

//         {isHovered && (
//           <div className="flex gap-2">
//             <button
//               onClick={onEdit}
//               className="p-1 text-blue-500 transition-colors rounded hover:bg-blue-100 focus:outline-none"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15.232 5.232l3.536 3.536M9 13h3v3m-2 2l2 2 9-9a2 2 0 00-2.828-2.828l-9 9z"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={onDelete}
//               className="p-1 text-red-500 transition-colors rounded hover:bg-red-100 focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>

//       <p
//         className={`mt-4 text-gray-600 ${
//           completed ? 'line-through' : ''
//         } ${isHovered ? 'block' : 'truncate'}`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// };

// export default TodoCard;

import React, { useState } from 'react';
import EditModal from './EditModal';

interface TodoCardProps {
  title: string;
  description: string;
  completed: boolean;
  onEdit: (newTitle: string, newDescription: string) => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  description,
  completed,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`relative p-5 bg-white border rounded-lg shadow-lg transition-all hover:shadow-xl ${
        completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggleComplete}
            className="mr-3 cursor-pointer"
          />
          <div className="flex flex-col">
            <h3
              className={`text-lg font-semibold ${
                completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-gray-600 ${
                completed ? 'line-through text-gray-400' : ''
              } truncate`}
              title={description}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Edit Icon */}
          <button
            className="p-2 text-gray-500 transition-colors rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setModalOpen(true)}
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
                strokeWidth="2"
                d="M12 20h9m-9-9h9m-9 5h3"
              />
            </svg>
          </button>

          {/* Delete Icon */}
          <button
            className="p-2 text-gray-500 transition-colors rounded hover:bg-gray-100 focus:outline-none"
            onClick={onDelete}
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={(newTitle, newDescription) => {
            console.log(`${newTitle}__${newDescription} from onsave todocard`)
            onEdit(newTitle, newDescription);
            setModalOpen(false);
          }}
          initialTitle={title}
          initialDescription={description}
        />
      )}
    </div>
  );
};

export default TodoCard;

// import React, { useState } from 'react';
// import EditModal from './EditModal';

// interface TodoCardProps {
//   title: string;
//   description: string;
//   completed: boolean;
//   onEdit: (newTitle: string, newDescription: string) => void;
//   onDelete: () => void;
//   onToggleComplete: () => void;
// }

// const TodoCard: React.FC<TodoCardProps> = ({
//   title,
//   description,
//   completed,
//   onEdit,
//   onDelete,
//   onToggleComplete,
// }) => {
//   const [isModalOpen, setModalOpen] = useState(false);

//   return (
//     <div
//       className={`relative p-5 bg-white border rounded-lg shadow-lg transition-all hover:shadow-xl ${
//         completed ? 'opacity-70' : ''
//       }`}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={completed}
//             onChange={onToggleComplete}
//             className="mr-3 cursor-pointer"
//           />
//           <div className="flex flex-col">
//             <h3
//               className={`text-lg font-semibold ${
//                 completed ? 'line-through text-gray-400' : ''
//               }`}
//             >
//               {title}
//             </h3>
//             <p
//               className={`text-gray-600 ${
//                 completed ? 'line-through text-gray-400' : ''
//               } truncate`}
//               title={description}
//             >
//               {description}
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           {/* Edit Icon */}
//           <button
//             className="p-2 text-gray-500 transition-colors rounded hover:bg-gray-100 focus:outline-none"
//             onClick={() => setModalOpen(true)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 20h9m-9-9h9m-9 5h3"
//               />
//             </svg>
//           </button>

//           {/* Delete Icon */}
//           <button
//             className="p-2 text-gray-500 transition-colors rounded hover:bg-gray-100 focus:outline-none"
//             onClick={onDelete}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <EditModal
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//           onSave={(newTitle, newDescription) => {
//             onEdit(newTitle, newDescription);
//             setModalOpen(false);
//           }}
//           initialTitle={title}
//           initialDescription={description}
//         />
//       )}
//     </div>
//   );
// };

// export default TodoCard;

