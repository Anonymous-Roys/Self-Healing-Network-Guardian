import React from 'react';
import { mockAlerts } from '../../data/mockData';
import { formatDistanceToNow } from '../../utils/dateUtils';

const NotificationsPanel: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockAlerts.map((alert) => {
          let bgColor = 'bg-white dark:bg-gray-800';
          let borderColor = '';
          let iconColor = '';
          
          switch (alert.type) {
            case 'error':
              borderColor = 'border-l-4 border-red-500';
              iconColor = 'text-red-500';
              break;
            case 'warning':
              borderColor = 'border-l-4 border-yellow-500';
              iconColor = 'text-yellow-500';
              break;
            case 'success':
              borderColor = 'border-l-4 border-green-500';
              iconColor = 'text-green-500';
              break;
            default:
              borderColor = 'border-l-4 border-blue-500';
              iconColor = 'text-blue-500';
              break;
          }
          
          if (!alert.isRead) {
            bgColor = 'bg-blue-50 dark:bg-gray-700';
          }
          
          return (
            <div 
              key={alert.id} 
              className={`${bgColor} ${borderColor} hover:bg-gray-50 dark:hover:bg-gray-700 p-4 transition-colors duration-150`}
            >
              <div className="flex items-start">
                <div className={`${iconColor} flex-shrink-0`}>
                  <span className="block h-2 w-2 rounded-full bg-current mt-1"></span>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{alert.message}</p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {formatDistanceToNow(new Date(alert.timestamp))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;