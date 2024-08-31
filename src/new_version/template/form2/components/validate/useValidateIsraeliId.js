import { useState, useEffect } from 'react';

const useValidateIsraeliId = (id) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateIsraeliId = (id) => {
      id = String(id).trim();
      if (id.length !== 9 || isNaN(id)) return false;

      const res = Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      });
      return res % 10 === 0;
    };

    setIsValid(validateIsraeliId(id));
  }, [id]);

  return isValid;
};

export default useValidateIsraeliId;
