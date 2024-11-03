import React from 'react';

interface NavbarProps {
  allCount: number;
  pendingCount: number;
  completedCount: number;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  allCount,
  pendingCount,
  completedCount,
  selectedCategory,
  onCategorySelect,
}) => {

  const getButtonClasses = (category: string) =>
    `shrink-0 rounded-lg p-2 text-sm font-medium transition-colors ${
      selectedCategory === category
        ? 'bg-sky-100 text-sky-600'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    }`;

  const renderBadge = (count: number) => (
    <p className="absolute -top-5 -right-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
      {count}
    </p>
  );

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      {/*<div className="sm:hidden">
        
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-200"
          onChange={(e) => onCategorySelect(e.target.value)}
          value={selectedCategory}
        >
          <option value="All">All ({allCount})</option>
          <option value="Pending">Pending ({pendingCount})</option>
          <option value="Completed">Completed ({completedCount})</option>
        </select>
      </div>*/}

      <div className="">
        {/* Centered navigation tabs */}
        <div className="flex justify-center gap-6" aria-label="Tabs">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
