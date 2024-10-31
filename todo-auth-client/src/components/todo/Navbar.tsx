import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  allCount: number;
  pendingCount: number;
  completedCount: number;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  allCount,
  pendingCount,
  completedCount,
  selectedCategory,
  onCategorySelect,
  onLogout,
}) => {
  const navigate = useNavigate();

  const getButtonClasses = (category: string) =>
    `p-2 flex flex-col items-center transition-colors ${
      selectedCategory === category ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 text-white'
    }`;

  const renderBadge = (count: number) => (
    <p className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white absolute top-[-12px] right-[-12px]">
      {count}
    </p>
  );

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-md relative">
      <div className="flex space-x-4">
        <button onClick={() => onCategorySelect('All')} className={getButtonClasses('All')}>
          <div className="relative">
            {renderBadge(allCount)}
            All
          </div>
        </button>
        <button onClick={() => onCategorySelect('Pending')} className={getButtonClasses('Pending')}>
          <div className="relative">
            {renderBadge(pendingCount)}
            Pending
          </div>
        </button>
        <button onClick={() => onCategorySelect('Completed')} className={getButtonClasses('Completed')}>
          <div className="relative">
            {renderBadge(completedCount)}
            Completed
          </div>
        </button>
        <button onClick={() => navigate('/whats-new')} className={getButtonClasses('WhatsNew')}>
          <div className="relative">
            <span role="img" aria-label="sparkles" className="text-yellow-300">✨</span>
            What's New
          </div>
        </button>
      </div>
      <div className="flex space-x-4">
        <button onClick={() => navigate("/profile")} className={getButtonClasses('Profile')}>
          Profile
        </button>
        <button onClick={onLogout} className="hover:bg-red-500 p-2 rounded transition-colors text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
