import React from 'react';
import { 
  Home, 
  Server, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Settings, 
  HelpCircle,
  Network,
  X
} from 'lucide-react';

interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  const navigation: NavigationItem[] = [
    { name: 'Dashboard', icon: <Home size={20} />, active: true, href: '/', },
    { name: 'Devices', icon: <Server size={20} />, active: false, href: '/devices', },
    { name: 'Compliance', icon: <Shield size={20} />, active: false, href: '/compliance', },
    { name: 'Automation', icon: <Activity size={20} />, active: false, href: '/automation', },
    { name: 'Topology', icon: <Network size={20} />, active: false, href: '/topology', },
    { name: 'Alerts', icon: <AlertTriangle size={20} />, active: false, href: '/alerts', },
  ];

  const secondaryNavigation: NavigationItem[] = [
    { name: 'Settings', icon: <Settings size={20} />, active: false, href: '/settings', },
    { name: 'Help', icon: <HelpCircle size={20} />, active: false, href: '/help', },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-900 shadow-md transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {isMobile && (
          <div className="flex justify-end px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="flex-1 px-3 py-16 overflow-y-auto">
          <div className="px-2 mt-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    item.active
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }
                `}
              >
                <div className={`mr-3 ${item.active ? 'text-blue-600 dark:text-blue-200' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'}`}>
                  {item.icon}
                </div>
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Support
            </h3>
            <div className="px-2 mt-1 space-y-1">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 transition-colors rounded-md group hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <div className="mr-3 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300">
                    {item.icon}
                  </div>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 font-medium text-white bg-blue-500 rounded">
                A
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">View profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;