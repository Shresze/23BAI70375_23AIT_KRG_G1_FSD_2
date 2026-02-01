import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../store/logsSlice";

const Logs = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.logs);

    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="container">
                <p>Fetching Eco Logs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
                <h3 style={{ color: "#ff4d4d" }}>Error</h3>
                <p>{error}</p>
                <button
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                    onClick={() => dispatch(fetchLogs())}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="page-title">Environmental Logs</h1>
                <button
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => dispatch(fetchLogs())}
                >
                    🔄
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {data.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {data.map((log) => (
                            <li key={log.id} style={{
                                padding: '15px',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span>{log.activity}</span>
                                <span style={{ fontWeight: 'bold' }}>{log.carbon} kg CO₂</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No logs found.</p>
                )}
            </div>
        </div>
    );
};

export default Logs;