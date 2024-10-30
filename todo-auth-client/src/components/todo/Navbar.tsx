// Navbar.tsx
import React from 'react';

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
  const getButtonClasses = (category: string) =>
    `p-2 rounded transition-colors ${
      selectedCategory === category ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-700 text-white'
    }`;

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <div className="flex space-x-4">
        <button onClick={() => onCategorySelect('All')} className={getButtonClasses('All')}>
          All ({allCount})
        </button>
        <button onClick={() => onCategorySelect('Pending')} className={getButtonClasses('Pending')}>
          Pending ({pendingCount})
        </button>
        <button onClick={() => onCategorySelect('Completed')} className={getButtonClasses('Completed')}>
          Completed ({completedCount})
        </button>
      </div>
      <div className="flex space-x-4">
        <button onClick={() => onCategorySelect('Profile')} className={getButtonClasses('Profile')}>
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
