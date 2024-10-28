// import React, { useState } from 'react';

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (title: string, description: string) => void;
//   initialTitle: string;
//   initialDescription: string;
// }

// const EditModal: React.FC<EditModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialTitle,
//   initialDescription,
// }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [description, setDescription] = useState(initialDescription);

//   const handleSave = () => {
//     onSave(title, description);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="max-w-md w-full bg-white border rounded-lg shadow-lg p-5">
//         <div className="flex items-center mb-4">
//           <svg
//             className="w-6 h-6 fill-current text-blue-500"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//           >
//             <path d="M0 0h24v24H0V0z" fill="none" />
//             <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//           </svg>
//           <h2 className="ml-3 font-semibold text-gray-800">Edit Todo</h2>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded-md"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             className="w-full p-2 border rounded-md"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end items-center">
//           <button
//             className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
//             onClick={handleSave}
//           >
//             Okay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// import React, { useState } from 'react';

// interface EditModalProps {
//   isOpen: boolean;
//   initialTitle: string;
//   initialDescription: string;
//   onClose: () => void;
//   onSave: (newTitle: string, newDescription: string) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({
//   isOpen,
//   initialTitle,
//   initialDescription,
//   onClose,
//   onSave,
// }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [description, setDescription] = useState(initialDescription);

//   const handleSave = () => {
//     // Prevent accidental form submissions or unwanted behavior
//     onSave(title, description);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//         <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={4}
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded-md"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;
// import React, { useState, useEffect } from 'react';

// interface EditModalProps {
//   isOpen: boolean;
//   initialTitle: string;
//   initialDescription: string;
//   onClose: () => void;
//   onSave: (newTitle: string, newDescription: string) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({
//   isOpen,
//   initialTitle,
//   initialDescription,
//   onClose,
//   onSave,
// }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [description, setDescription] = useState(initialDescription);

//   // Sync the initial data when the modal is opened
//   useEffect(() => {
//     if (isOpen) {
//       setTitle(initialTitle);
//       setDescription(initialDescription);
//     }
//   }, [isOpen, initialTitle, initialDescription]);

//   const handleSave = () => {
//     // Pass updated data to the parent component
//     onSave(title, description);
//     onClose(); // Close the modal after saving
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//         <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={4}
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded-md"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  initialTitle: string;
  initialDescription: string;
  onClose: () => void;
  onSave: (newTitle: string, newDescription: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  initialTitle,
  initialDescription,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  // Sync initial data when modal is opened
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      console.log(`${initialTitle}---${initialDescription} initial value from editmodal`);
    }
  }, [isOpen, initialTitle, initialDescription]);

  const handleSave = () => {
    // Save changes and close the modal
    console.log(`${title}___${description} from handlesave onsave from editmodal`);
    onSave(title, description);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
