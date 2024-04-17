import React from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="flex justify-center mt-4 ">
            <ul className="flex list-none rounded-md overflow-hidden items-center">
                <li
                    className={`cursor-pointer hover:bg-gray-200 flex items-center justify-center px-3 py-2 mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => handlePageChange(1)}
                >
                    &lt;&lt;
                </li>
                <li
                    className={`cursor-pointer hover:bg-gray-200 flex items-center justify-center px-3 py-2 mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => handlePageChange(1)}
                >
                    &lt;
                </li>
                {getPageNumbers().map((page) => (
                    <li
                        key={page}
                        className={`cursor-pointer hover:bg-gray-200 flex items-center justify-center px-3 py-2 mx-1 ${currentPage === page ? "bg-blue-500 text-white" : ""
                            }`}
                        onClick={() => handlePageChange(page)}
                        style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
                    >
                        {page}
                    </li>
                ))}

                <li
                    className={`cursor-pointer hover:bg-gray-200 flex items-center justify-center px-3 py-2 mx-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &gt;
                </li>
                <li
                    className={`cursor-pointer hover:bg-gray-200 flex items-center justify-center px-3 py-2 mx-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    &gt;&gt;
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
