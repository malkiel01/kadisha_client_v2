// import React, { useState } from 'react';
// import './SearchInput.css'; // נניח שיצרת קובץ CSS עם העיצוב הדרוש

// const SearchInput = () => {
//   const [inputFocused, setInputFocused] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleFocus = () => {
//     setInputFocused(true);
//   };

//   const handleBlur = () => {
//     if (!searchTerm) {
//       setInputFocused(false);
//     }
//   };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className={`search-input ${inputFocused ? 'focused' : ''}`}>
//     <div className="search-icon">
//       {/* SVG שהוספת */}
//       <svg viewBox="0 0 20 20" fill="currentColor" className="text-gray-600 w-7">
//         <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path>
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"></path>
//       </svg>
//     </div>
//       {/* <input
//         type="text"
//         value={searchTerm}
//         onChange={handleChange}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder={inputFocused ? '' : 'חיפוש'}
//         dir="rtl"
//       /> */}
//     </div>
//   );
// };

// export default SearchInput;
