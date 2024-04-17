import { FC, useState } from 'react';

type CheckboxProps = {
  className?: string;
  onChange?: (isChecked: boolean) => void;
};

const Checkbox: FC<CheckboxProps> = ({ className, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <label
        className={`inline-flex h-7 w-12 border border-black cursor-pointer rounded-md text-xs justify-center items-center hover:border-green800 hover:text-green800 ${isChecked ? 'border-green800 text-white bg-green600' : 'bg-white text-black'}`}
      >
        <input
          type="radio"
          className="hidden"
          checked={isChecked}
          onChange={handleToggle}
        />
        Yes
      </label>
      <label
        className={`inline-flex h-7 w-12 border border-black ml-4 cursor-pointer rounded-md text-xs items-center justify-center hover:border-red800 hover:text-red800 ${!isChecked ? 'border-red800  text-white bg-red600' : 'bg-white text-black'}`}
      >
        <input
          type="radio"
          className="hidden"
          checked={!isChecked}
          onChange={handleToggle}
        />
        No
      </label>
    </div>
  );
};

export default Checkbox;

