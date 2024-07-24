import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState(() => {
    const savedCriteria = localStorage.getItem('searchCriteria');
    return savedCriteria ? JSON.parse(savedCriteria) : {
      location: '',
      startDate: null,
      endDate: null,
      startTime: '0',
      endTime: '0',
    };
  });

  useEffect(() => {
    localStorage.setItem('searchCriteria', JSON.stringify(searchCriteria));
  }, [searchCriteria]);

  return (
    <SearchContext.Provider value={{ searchCriteria, setSearchCriteria }}>
      {children}
    </SearchContext.Provider>
  );
};
