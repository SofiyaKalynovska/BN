// import React, { FC, useState } from 'react';
// import './Dropdown.scss';
// import { twJoin } from 'tailwind-merge';

// export type MenuItemType = {
//   key: string;
//   label: string;
// };

// export type CustomDropdownProps = {
//   items?: MenuItemType[];
//   onChange?: (selectedItem: MenuItemType) => void;
// };

// export const Dropdown: FC<CustomDropdownProps> = ({ items = [], onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [filter, setFilter] = useState('');
//   const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

//   const filteredItems = items.filter(item =>
//     item.label.toLowerCase().includes(filter.toLowerCase())
//   );

//   const handleItemClick = (item: MenuItemType) => {
//     setSelectedItem(item);
//     setIsOpen(false);
//     if (onChange) {
//       onChange(item);
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value);
//   };

//   const handleInputBlur = () => {
//     setIsOpen(false);
//   };

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         className="border-gray-300 px-3 py-2 pr-8 border rounded-md focus:outline-none focus:border-blue-500"
//         placeholder="Type to filter or add your own"
//         value={filter}
//         onChange={handleInputChange}
//         onBlur={handleInputBlur}
//         onClick={handleToggleDropdown}
//       />
//       <button
//         className="top-0 right-0 absolute border-gray-300 px-2 border-l h-full focus:outline-none"
//         onClick={handleToggleDropdown}
//         style={{ top: '50%', transform: 'translateY(-50%)' }}
//       >
//         &#9660;
//       </button>
//       {isOpen && (
//         <ul className="z-10 absolute border-gray-300 bg-white mt-1 border rounded-md w-full max-h-60 overflow-y-auto">
//           {filteredItems.map(item => (
//             <li
//               key={item.key}
//               className="hover:bg-gray-100 px-3 py-2 cursor-pointer"
//               onClick={() => handleItemClick(item)}
//             >
//               {item.label}
//             </li>
//           ))}
//         </ul>
//       )}
//       {selectedItem && (
//         <div className="top-full left-0 absolute border-gray-300 bg-white mt-1 border rounded-md w-full">
//           <div className="hover:bg-gray-100 px-3 py-2 cursor-pointer" onClick={() => handleItemClick(selectedItem)}>
//             {selectedItem.label}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// Dropdown.tsx
import React, { FC, useState } from 'react';
import './Dropdown.scss';


export type MenuItemType = {
  key: string;
  label: string;
};
export type CustomDropdownProps = {
  items?: MenuItemType[];
  onChange?: (selectedItem: MenuItemType, index: number) => void;
};

export const Dropdown: FC<CustomDropdownProps> = ({ items = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(filter.toLowerCase())
  );

  const handleItemClick = (item: MenuItemType, index: number) => {
    setSelectedItem(item);
    setIsOpen(false);
    if (onChange) {
      onChange(item, index);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleInputBlur = () => {
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border-gray-300 px-3 py-2 pr-8 border rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Type to filter or add your own"
        value={filter}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClick={handleToggleDropdown}
      />
      <button
        className="top-0 right-0 absolute border-gray-300 px-2 border-l h-full focus:outline-none"
        onClick={handleToggleDropdown}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        &#9660;
      </button>
      {isOpen && (
        <ul className="z-10 absolute border-gray-300 bg-white mt-1 border rounded-md w-full max-h-60 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <li
              key={item.key}
              className="hover:bg-gray-100 px-3 py-2 cursor-pointer"
              onClick={() => handleItemClick(item, index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && (
        <div className="top-full left-0 absolute border-gray-300 bg-white mt-1 border rounded-md w-full">
          <div className="hover:bg-gray-100 px-3 py-2 cursor-pointer" onClick={() => handleItemClick(selectedItem, -1)}>
            {selectedItem.label}
          </div>
        </div>
      )}
    </div>
  );
};
