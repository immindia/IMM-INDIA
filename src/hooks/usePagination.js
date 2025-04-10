import { useMemo } from "react";

/**
 * Custom hook for pagination management
 * @param {Array} items - Array of items to paginate
 * @param {Number} itemsPerPage - Number of items per page
 * @param {Number} currentPage - Current page number
 * @returns {Object} Pagination data and helper functions
 */
export const usePagination = (items, itemsPerPage, currentPage) => {
  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items for the page
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  // Generate pagination range with ellipsis
  const pageRange = useMemo(() => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    // Always add first page
    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always add last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let l;
    for (let i of range) {
      if (l) {
        if (i - l > 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  return {
    currentItems,
    totalPages,
    pageRange,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};
