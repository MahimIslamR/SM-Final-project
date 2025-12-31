import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [categoryId, setCategoryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <FilterContext.Provider value={{ categoryId, setCategoryId, searchTerm, setSearchTerm }}>
            {children}
        </FilterContext.Provider>
    );
};
