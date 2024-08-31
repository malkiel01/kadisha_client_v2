import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Print, PictureAsPdf, FileDownload } from '@mui/icons-material';

const TableControls = ({ onPrint, onExportPDF, onExportExcel, buttons }) => {
  return (
    <div>
      {buttons.includes('print') && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<Print />}
          onClick={onPrint}
          style={{ marginLeft: '10px' }}
        >
          הדפס טבלה
        </Button>
      )}
      {buttons.includes('exportPDF') && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdf />}
          onClick={onExportPDF}
          style={{ marginLeft: '10px' }}
        >
          יצוא ל-PDF
        </Button>
      )}
      {buttons.includes('exportExcel') && (
        <Button
          variant="contained"
          color="success"
          startIcon={<FileDownload />}
          onClick={onExportExcel}
        >
          יצוא לאקסל
        </Button>
      )}
    </div>
  );
};

TableControls.propTypes = {
  onPrint: PropTypes.func,
  onExportPDF: PropTypes.func,
  onExportExcel: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableControls;
