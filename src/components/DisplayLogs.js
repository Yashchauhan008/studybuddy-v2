import React, { useState, useEffect } from "react";
import "../css/component.css";
import Loader from "./Loader";

const DisplayLogs = () => {
  const [logs, setLogs] = useState([]); // State to store all logs
  const [filteredLogs, setFilteredLogs] = useState([]); // State to store filtered logs
  const [username, setUsername] = useState(""); // State for username input
  const [action, setAction] = useState(""); // State for selected action
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
        throw new Error("Failed to fetch logs");
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
      filtered = filtered.filter((log) =>
        log.username.toLowerCase().includes(username.toLowerCase())
      );
    }

    if (action) {
      filtered = filtered.filter((log) => log.action === action);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home">
      <h1 className="reveal">Logs</h1>

      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter logs by username..."
          value={username}
          onChange={handleUsernameChange}
        />
        <select className="action-dropdown" value={action} onChange={handleActionChange}>
          <option value="">Filter by action</option>
          <option value="Download">Download</option>
          <option value="Register">Register</option>
          <option value="Login">Login</option>
          <option value="Logout">Logout</option>
          <option value="Explore">Explore</option>
        </select>
      </div>

        <div className="log-cards">

          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <div className="log-card">
                <h2>{log.username}</h2>
                <h3>{log.message}</h3>
                <div className={`${log.action} action`}>{log.action}</div>
                <h4>{new Date(log.timestamp).toLocaleString()}</h4>
              </div>
            ))
          ) : (
            <tr>
              <td colSpan="subject-card">No logs found</td>
            </tr>
          )}
          {/* </tbody> */}
        </div>
    </div>
  );
};

export default DisplayLogs;
