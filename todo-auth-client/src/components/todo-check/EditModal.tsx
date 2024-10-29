import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { editExistingTodo } from '../../slices/todoSlice';

interface EditModalProps {
  id: string;
  isOpen: boolean;
  initialTitle: string;
  initialDescription: string;
  onClose: () => void;
  onSave: (newTitle: string, newDescription: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  id,
  isOpen,
  initialTitle,
  initialDescription,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const dispatch = useDispatch<AppDispatch>();

  // Sync initial data when modal is opened
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      console.log(`${initialTitle}---${initialDescription} initial value from editmodal`);
    }
  }, [isOpen, initialTitle, initialDescription]);

  const handleSave = async() => {
    // Save changes and close the modal
    console.log(`${title}___${description} from handlesave onsave from editmodal`);
    await dispatch(editExistingTodo({id,title,description}))
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
