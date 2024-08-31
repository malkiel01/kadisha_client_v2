import React from 'react';
import ReportList from './reportsBase';
// import ReportList from './reportList'; // מייבא את קומפוננטת הדוחות

const IndexComponent = () => {
  const reports = [
    {
      name: 'דוח מכירות',
      description: 'דוח המציג נתוני מכירות חודשיים',
      route: '/sales-report',
    },
    {
      name: 'דוח מלאי',
      description: 'דוח המציג מצב מלאי נוכחי',
      route: '/inventory-report',
    },
    {
      name: 'דוח לקוחות',
      description: 'דוח המציג נתוני לקוחות',
      route: '/customer-report',
    },
  ];

  return (
    <div>
      <h1>רשימת דוחות</h1>
      <ReportList reports={reports} />
    </div>
  );
};

export default IndexComponent;
