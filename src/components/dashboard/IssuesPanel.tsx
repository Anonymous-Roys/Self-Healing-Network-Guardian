import React from 'react';
import { ConfigIssue } from '../../types';
import { AlertTriangle, AlertCircle, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { mockConfigIssues, mockDevices } from '../../data/mockData';
import { formatDistanceToNow } from '../../utils/dateUtils';

const IssuesPanel: React.FC = () => {
  const issues = mockConfigIssues;
  
  const getDeviceName = (deviceId: string) => {
    const device = mockDevices.find(d => d.id === deviceId);
    return device ? device.name : 'Unknown Device';
  };

  const getSeverityIcon = (severity: ConfigIssue['severity']) => {
    switch (severity) {
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: ConfigIssue['status']) => {
    switch (status) {
      case 'detected':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'fixing':
        return <RotateCcw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: ConfigIssue['status'], autoRemediated: boolean) => {
    let bgColor, textColor, statusText;
    
    switch (status) {
      case 'detected':
        bgColor = 'bg-yellow-100 dark:bg-yellow-900';
        textColor = 'text-yellow-800 dark:text-yellow-200';
        statusText = 'Detected';
        break;
      case 'fixing':
        bgColor = 'bg-blue-100 dark:bg-blue-900';
        textColor = 'text-blue-800 dark:text-blue-200';
        statusText = 'Auto-Fixing';
        break;
      case 'resolved':
        bgColor = 'bg-green-100 dark:bg-green-900';
        textColor = 'text-green-800 dark:text-green-200';
        statusText = 'Resolved';
        break;
      case 'failed':
        bgColor = 'bg-red-100 dark:bg-red-900';
        textColor = 'text-red-800 dark:text-red-200';
        statusText = 'Failed';
        break;
      default:
        bgColor = 'bg-gray-100 dark:bg-gray-900';
        textColor = 'text-gray-800 dark:text-gray-200';
        statusText = 'Unknown';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {statusText}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Configuration Issues
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Current network configuration issues and remediation status
        </p>
      </div>
      {issues.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {issues.map((issue) => (
            <li key={issue.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getSeverityIcon(issue.severity)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {issue.description}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      {getStatusBadge(issue.status, issue.autoRemediated)}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Device: <span className="font-medium text-gray-600 dark:text-gray-300">{getDeviceName(issue.deviceId)}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Detected {formatDistanceToNow(new Date(issue.timestamp))}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {issue.autoRemediated && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Auto-Remediated
                        </span>
                      )}
                      <div className="ml-2">
                        {getStatusIcon(issue.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-5 text-center text-gray-500 dark:text-gray-400">
          No configuration issues found
        </div>
      )}
    </div>
  );
};

export default IssuesPanel;