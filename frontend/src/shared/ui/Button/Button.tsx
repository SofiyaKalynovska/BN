import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  mb?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, size = 'medium', disabled = false, mb }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-sm w-44 h-10';
      case 'large':
        return 'text-base w-360 h-12';
      default:
        return 'px-4 py-2';
    }
  };

  const buttonClasses = `bg-purple800 text-white border border-pink800 rounded-2xl disabled:bg-gray-400 disabled:cursor-not-allowed ${getSizeClass()}`;

  return (
    <button
      type="submit"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={{ marginBottom: mb }}
    >
      {children}
    </button>
  );
};

export default Button;
