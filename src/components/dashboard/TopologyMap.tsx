import React, { useEffect, useRef } from 'react';
import { mockTopology } from '../../data/mockData';

const TopologyMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const getNodeColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981'; // green
      case 'warning': return '#F59E0B'; // yellow
      case 'critical': return '#EF4444'; // red
      case 'offline': return '#6B7280'; // gray
      default: return '#3B82F6'; // blue
    }
  };
  
  const getLinkColor = (status: string) => {
    switch (status) {
      case 'active': return '#3B82F6'; // blue
      case 'degraded': return '#F59E0B'; // yellow
      case 'down': return '#EF4444'; // red
      default: return '#D1D5DB'; // light gray
    }
  };
  
  const getNodeRadius = (type: string) => {
    switch (type) {
      case 'router': return 12;
      case 'firewall': return 12;
      case 'switch': return 10;
      case 'server': return 8;
      case 'client': return 6;
      default: return 8;
    }
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const scale = window.devicePixelRatio || 1;
    
    // Set display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    // Scale the context
    ctx.scale(scale, scale);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw links
    mockTopology.links.forEach(link => {
      const source = mockTopology.nodes.find(node => node.id === link.source);
      const target = mockTopology.nodes.find(node => node.id === link.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = getLinkColor(link.status);
        
        if (link.status === 'down') {
          ctx.setLineDash([5, 5]);
        } else if (link.status === 'degraded') {
          ctx.setLineDash([10, 3]);
        } else {
          ctx.setLineDash([]);
        }
        
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
    
    // Draw nodes
    mockTopology.nodes.forEach(node => {
      const radius = getNodeRadius(node.type);
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = getNodeColor(node.status);
      ctx.fill();
      
      // Node border
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      
      // Node label
      ctx.font = '10px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + radius + 15);
    });
    
  }, []);
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Network Topology
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Visual representation of network devices and connections
        </p>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Warning</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Critical</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Offline</span>
          </div>
        </div>
        <div className="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-md overflow-hidden relative">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopologyMap;