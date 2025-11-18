import React from "react";

export default function PaginationBar({totalItems,pageSize,currentPage,onPageChange}){
    const totalPages = Math.ceil(totalItems / pageSize);
    if(totalPages <= 1){
        return null;
    }

    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }
        
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxVisible - 1);
        
        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }
        
        return pages;
    };

    const pages = getVisiblePages();

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <span>Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} posts</span>
            </div>
            <div className="pagination">
                <button 
                    className="page-btn nav-btn" 
                    onClick={() => onPageChange(Math.max(1,currentPage - 1))} 
                    disabled={currentPage === 1}
                >
                    ← Previous
                </button>
                
                {pages.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                    ) : (
                        <button 
                            key={page} 
                            className={`page-btn ${page === currentPage ? 'active' : ''}`} 
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button 
                    className="page-btn nav-btn" 
                    onClick={() => onPageChange(Math.min(totalPages,currentPage + 1))} 
                    disabled={currentPage === totalPages}
                >
                    Next →
                </button>
            </div>
        </div>
    )
}