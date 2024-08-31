// import { useState, useEffect } from 'react';
// import { HDate } from '@hebcal/core';

// const hebrewDate = (gregorianDate) => {

//   function convertToHebrewDate(gregDate) {
//     const hdate = new HDate(gregDate);
//     const hebrewDateWithNiqqud = hdate.renderGematriya('he');

//     // Remove niqqud using regular expressions
//     const niqqudRegex = /[\u0591-\u05C7]/g;
//     const hebrewDateWithoutNiqqud = hebrewDateWithNiqqud.replace(niqqudRegex, '');

//     return hebrewDateWithoutNiqqud;
//   }

//   const gregDate = new Date(gregorianDate); // 14th March 2024 (months are 0-indexed)
//   // const gregDate = new Date('2024-03-14T23:00:00'); // 14th March 2024 (months are 0-indexed)
//   const hebrewDate = convertToHebrewDate(gregDate);

//   return hebrewDate;
// };

// export default hebrewDate;

import { HDate } from '@hebcal/core';

const hebrewDate = (gregorianDate) => {

  function convertToHebrewDate(gregDate) {
    const hdate = new HDate(gregDate);
    const hebrewDateWithNiqqud = hdate.renderGematriya('he');

    // Remove niqqud using regular expressions
    const niqqudRegex = /[\u0591-\u05C7]/g;
    const hebrewDateWithoutNiqqud = hebrewDateWithNiqqud.replace(niqqudRegex, '');

    return hebrewDateWithoutNiqqud;
  }

  const gregDate = new Date(gregorianDate); // Create Date object from input string
  const hebrewDate = convertToHebrewDate(gregDate);

  return hebrewDate;
};

export default hebrewDate;


