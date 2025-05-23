import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Device } from '../../types';
import { Check, AlertTriangle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { mockDevices } from '../../data/mockData';

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();
    
    const subscription = supabase
      .channel('devices_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'devices' 
      }, payload => {
        console.log('Change received!', payload);
        fetchDevices();
      })
      .subscribe();
      setTimeout(() => {
        setDevices(mockDevices);
        setLoading(false);
      }, 500);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('name');

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: Device['type']) => {
    switch (type) {
      case 'router':
        return (
          <div className="p-2 bg-blue-100 rounded-md dark:bg-blue-800">
            <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-300" />
          </div>
        );
      case 'switch':
        return (
          <div className="p-2 bg-green-100 rounded-md dark:bg-green-800">
            <svg className="w-4 h-4 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        );
      case 'firewall':
        return (
          <div className="p-2 bg-red-100 rounded-md dark:bg-red-800">
            <svg className="w-4 h-4 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score > 0) return 'bg-red-500';
    return 'bg-gray-300 dark:bg-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Network Devices
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of all monitored devices and their current status
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {devices.map((device) => (
          <li key={device.id}>
            <div className="flex items-center px-4 py-4 transition-colors duration-150 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center">
                  {getTypeIcon(device.type)}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {device.name}
                    </div>
                    <div className="flex mt-1">
                      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        {device.ip} • {device.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-4 sm:mt-0 sm:ml-5">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-4">
                      <div 
                        className={`h-2.5 rounded-full ${getProgressBarColor(device.complianceScore)}`} 
                        style={{ width: `${device.complianceScore}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-sm text-gray-500 dark:text-gray-400">
                      {device.complianceScore}%
                    </span>
                    <div className="ml-4">
                      {getStatusIcon(device.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Devices;