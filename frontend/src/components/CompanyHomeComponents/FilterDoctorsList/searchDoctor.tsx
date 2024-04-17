import React from 'react';

interface DoctorSearchProps {
    onSearch: (query: string) => void;
    value: string;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({ onSearch, value }) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        onSearch(query);
    };

    const clearSearch = () => {
        onSearch('');
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={handleSearch}
                placeholder="Search by name or last name"
                className="border-gray-300 px-4 py-2 pr-10 border rounded-3xl w-450 h-12 text-sm"
            />
            {value && (
                <button
                    className="top-1/2 right-2 absolute bg-blue-500 border-none w-8 h-8 text-white transform -translate-y-1/2 cursor-pointer outline-none focus:outline-none"
                    onClick={clearSearch}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default DoctorSearch;
