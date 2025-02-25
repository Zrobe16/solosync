import React from 'react';
import ProjectManager from './ProjectManager';
import TimeTracker from './TimeTracker';
import Invoices from './Invoices';

function Dashboard() {
  return (
    <div>
      <h1>SoloSync Dashboard</h1>
      <ProjectManager />
      <TimeTracker />
      <Invoices />
    </div>
  );
}

export default Dashboard;
