import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addNewTodo } from "../../slices/todoSlice";
import toast from "react-hot-toast";

// interface NewTodo{
//     title:string;
//     description?:string;
// }
interface AddModalProps{
    onClose: () => void;
  onSave: () => void;
}

export const AddModal:React.FC<AddModalProps>=({onClose,onSave})=>{
    //const [todo,setTodo]=useState<NewTodo>({title:"",description:""});
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const dispatch=useDispatch<AppDispatch>();
    const handleSave=async()=>{
      const status = await dispatch(addNewTodo({ title, description }));
      if (status.meta.requestStatus === "fulfilled") {
        toast.success(`Successfully created a new todo!!!`);
        onSave();
      return
    }
    toast.error("Could not create a new todo!!!");
    onSave();
    }
    return (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
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
  </div>);
}