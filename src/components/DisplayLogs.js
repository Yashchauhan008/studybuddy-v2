import React, { useState, useEffect } from 'react';
import "../css/component.css";

const DisplayLogs = () => {
  const [logs, setLogs] = useState([]); // State to store all logs
  const [filteredLogs, setFilteredLogs] = useState([]); // State to store filtered logs
  const [username, setUsername] = useState(''); // State for username input
  const [action, setAction] = useState(''); // State for selected action
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const base_url = process.env.REACT_APP_BASE_URL;

  // Fetch all logs from the server
  const fetchLogs = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(`${base_url}/log/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data.logs); // Store all logs
      setFilteredLogs(data.logs); // Initially, show all logs
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Filter logs by username and action
  const filterLogs = () => {
    let filtered = logs;

    if (username) {
      filtered = filtered.filter(log =>
        log.username.toLowerCase().includes(username.toLowerCase())
      );
    }

    if (action) {
      filtered = filtered.filter(log => log.action === action);
    }

    setFilteredLogs(filtered);
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle action dropdown change
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  // Apply filters whenever username or action changes
  useEffect(() => {
    filterLogs();
  }, [username, action, logs]);

  // Fetch logs when the component mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="home">
      <h1 className='reveal'>Logs</h1>

      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter logs by username..."
          value={username}
          onChange={handleUsernameChange}
        />
        <select value={action} onChange={handleActionChange}>
          <option value="">Filter by action</option>
          <option value="Download">Download</option>
          <option value="Register">Register</option>
          <option value="Login">Login</option>
          <option value="Logout">Logout</option>
          <option value="Explore">Explore</option>
        </select>
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <table className="logs-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Message</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.username}</td>
                  <td>{log.message}</td>
                  <td>{log.action}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayLogs;
