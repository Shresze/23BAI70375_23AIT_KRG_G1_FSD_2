import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogs } from '../store/logsSlice';

export default function DashboardSummary() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const highEmissions = data.filter((log) => log.carbon >= 4);
  const lowEmissions = data.filter((log) => log.carbon < 4);

  if (loading) return <div className="container"><p>Loading emissions summary...</p></div>;

  return (
    <div className="container">
      <h2 className="page-title">Dashboard Summary</h2>

      <div className="cards-container">
        {/* High Carbon Emission Card */}
        <div className="carbon-card card-high">
          <h3 className="card-title">HIGH CARBON EMISSION</h3>
          <ul className="card-list">
            {highEmissions.map(log => (
              <li key={log.id} className="card-item text-high">
                {log.activity} {log.carbon}
              </li>
            ))}
          </ul>
        </div>

        {/* Low Carbon Emission Card */}
        <div className="carbon-card card-low">
          <h3 className="card-title">LOW CARBON EMISSION</h3>
          <ul className="card-list">
            {lowEmissions.map(log => (
              <li key={log.id} className="card-item text-low">
                {log.activity} {log.carbon}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
