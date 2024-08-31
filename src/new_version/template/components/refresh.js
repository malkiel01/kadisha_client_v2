import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import useQueries from '../../../database/useQueries';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled, keyframes } from '@mui/system';
import { Tooltip } from '@mui/material';

// אנימציה של ספין
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// יצירת קומפוננטת Icon עם אנימציה מותאמת, ה- spinning לא יועבר ל-DOM
export const SpinningRefreshIcon = styled(RefreshIcon, {
  shouldForwardProp: (prop) => prop !== 'spinning',
})(({ spinning }) => ({
  animation: spinning ? `${spin} 2s linear infinite` : 'none',
}));

const RefreshButton = () => {
  const [spinning, setSpinning] = useState(false);

  const {
    AllDataCemeteries,
    AllDataBlocks,
    AllDataPlots,
    AllDataAreaGraves,
    AllDataGraves,
    AllDataRows,
    AllDataCustomers,
    AllDataPurchases,
    AllDataPurchasesOld,
    AllDataBurials,
    AllDataPayments,
    AllDataCities,
    AllDataCountries,
    AllDataSignatures,
  } = useQueries();

  const handleClick = async () => {
    setSpinning(true);

    try {
      await Promise.all([
        AllDataCemeteries(),
        AllDataBlocks(),
        AllDataPlots(),
        AllDataAreaGraves(),
        AllDataGraves(),
        AllDataRows(),
        AllDataCustomers(),
        AllDataPurchases(),
        AllDataPurchasesOld(),
        AllDataBurials(),
        AllDataPayments(),
        AllDataCities(),
        AllDataCountries(),
        AllDataSignatures()
      ]);
      // כל הפונקציות הסתיימו בהצלחה
      setSpinning(false);
    } catch (error) {
      setSpinning(false);
      // טיפול בשגיאות אם אחת הפונקציות נכשלה
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Tooltip title="רענון נתונים">
      <IconButton onClick={handleClick} color="inherit">
        <SpinningRefreshIcon spinning={spinning} color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default RefreshButton;
