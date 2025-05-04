import React from 'react';
import { RemediationAction } from '../../types';
import { Check, X, Clock, RefreshCw } from 'lucide-react';
import { mockRemediationActions, mockDevices } from '../../data/mockData';
import { formatDistanceToNow } from '../../utils/dateUtils';

const RemediationHistory: React.FC = () => {
  const actions = mockRemediationActions;
  
  const getDeviceName = (deviceId: string) => {
    const device = mockDevices.find(d => d.id === deviceId);
    return device ? device.name : 'Unknown Device';
  };

  const getStatusIcon = (status: RemediationAction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: RemediationAction['status']) => {
    let bgColor, textColor, statusText;
    
    switch (status) {
      case 'pending':
        bgColor = 'bg-yellow-100 dark:bg-yellow-900';
        textColor = 'text-yellow-800 dark:text-yellow-200';
        statusText = 'Pending';
        break;
      case 'in-progress':
        bgColor = 'bg-blue-100 dark:bg-blue-900';
        textColor = 'text-blue-800 dark:text-blue-200';
        statusText = 'In Progress';
        break;
      case 'completed':
        bgColor = 'bg-green-100 dark:bg-green-900';
        textColor = 'text-green-800 dark:text-green-200';
        statusText = 'Completed';
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
          Self-Healing Activity
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Recent automated remediation actions
        </p>
      </div>
      {actions.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {actions.map((action) => (
            <li key={action.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getStatusIcon(action.status)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate mr-1">
                      {action.action}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      {getStatusBadge(action.status)}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Device: <span className="font-medium text-gray-600 dark:text-gray-300">{getDeviceName(action.deviceId)}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(action.timestamp))}
                      </p>
                    </div>
                    {action.executionTime && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Execution time: <span className="font-medium">{action.executionTime}s</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-5 text-center text-gray-500 dark:text-gray-400">
          No remediation actions recorded
        </div>
      )}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6">
        <div className="flex justify-center">
          <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemediationHistory;