import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { GlobalContext } from '../../../../App';
import { useEffect } from 'react';

const ReportCard = ({ report }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { setBreadcrumbs, setTitle } = useContext(GlobalContext);
  
  useEffect(() => {
    setBreadcrumbs([])
    setTitle(`דוחות`)
  }, [location.pathname])

  const handleClick = () => {
    navigate(report.route);
  };

  return (
    <div onClick={handleClick} style={styles.card}>
      <h3>{report.name}</h3>
      <p>{report.description}</p>
    </div>
  );
};

const ReportList = ({ reports }) => {
  return (
    <div style={styles.container}>
      {reports.map((report, index) => (
        <ReportCard key={index} report={report} />
      ))}
    </div>
  );
};

ReportList.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};

// Add a hover effect
ReportCard.defaultProps = {
  report: {},
};

ReportCard.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportList;
