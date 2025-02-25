import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimeTracker() {
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [projectId, setProjectId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let interval;
    if (tracking) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tracking, startTime]);

  const startTimer = () => {
    setStartTime(new Date());
    setTracking(true);
  };

  const stopTimer = () => {
    const endTime = new Date();
    axios.post('http://localhost:5000/api/time-tracking', { // Update this URL later
      project_id: projectId,
      user_id: 1, // Replace with authenticated user ID later
      start_time: startTime,
      end_time: endTime,
      description: description
    })
    .then(response => console.log('Time entry recorded:', response.data))
    .catch(error => console.error(error));
    setTracking(false);
    setElapsedTime(0);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div>
      <h2>Time Tracker</h2>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>
      <input
        type="text"
        placeholder="Project ID"
        value={projectId}
        onChange={e => setProjectId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {!tracking ? (
        <button onClick={startTimer}>Start Timer</button>
      ) : (
        <button onClick={stopTimer}>Stop Timer</button>
      )}
    </div>
  );
}

export default TimeTracker;
