// import React, { useState } from 'react';
// import toast from 'react-hot-toast';

const WhatsNew: React.FC = () => {
    // const [feedback, setFeedback] = useState<string>('');

    // const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setFeedback(e.target.value);
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Handle the feedback submission (e.g., send it to a server)
    //     // Optionally, clear the feedback input
    //     setFeedback('');
    //     toast.success('Thank you for your feedback! 😊');
    // };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">What's New 🚀</h1>
            <p className="mb-2">We apologize for the issues you faced. We are currently working to fix them. Get ready for new updates! 🎉</p>
            <h2 className="text-2xl font-semibold mb-2">New Features:</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Improved user authentication process. 🔒</li>
                <li>Enhanced UI for a better user experience. 🎨</li>
                <li>List your todos. ⏰</li>
                <li>Added feature for filtering pending, completed todos. 🗂️</li>
            </ul>
            {/*<h2 className="text-xl font-semibold mb-2">Feedback:</h2>
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
            </form>*/}
        </div>
    );
};

export default WhatsNew;
