import React from 'react';
import DashboardHeader from './DashboardHeader';
import DeviceStatusList from './DeviceStatusList';
import IssuesPanel from './IssuesPanel';
import RemediationHistory from './RemediationHistory';
import TopologyMap from './TopologyMap';

const Dashboard: React.FC = () => {
  return (
    <div>
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopologyMap />
        <DeviceStatusList />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IssuesPanel />
        <RemediationHistory />
      </div>
    </div>
  );
};

export default Dashboard;