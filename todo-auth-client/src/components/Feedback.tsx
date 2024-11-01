import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addNewFeedback } from '../slices/feedbackSlice';

const Feedback = () => {
    const [feedback, setFeedback] = useState<string>('');
    const auth = useSelector((state: RootState) => state.auth);
    const { isAuthenticated,user } = auth;
    const dispatch = useDispatch<AppDispatch>();

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        let status;
        if (user) {
            status=await dispatch(addNewFeedback({ userId: user._id, username: user.username, feedback }));
        }
        if(status?.meta.requestStatus==="fulfilled") toast.success('Thank you for your feedback! 😊');
        if(status?.meta.requestStatus==="rejected") toast.error('Sorry could anot add your feedback! 😢');
        setFeedback('');
        
    };
  return (
      <>
          {isAuthenticated&&(<><h2 className="text-xl font-semibold mb-2">Feedback:</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    rows={5}
                    placeholder="Provide your feedback here... 📝"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    required
                />
                <button 
                    type="submit" 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Submit Feedback 🚀
                </button>
            </form></>)}
      </>
  )
}

export default Feedback