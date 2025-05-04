export interface Device {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall';
  ip: string;
  status: 'online' | 'offline' | 'warning' | 'critical';
  lastChecked: string;
  complianceScore: number;
  location: string;
}

export interface ConfigIssue {
  id: string;
  deviceId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  status: 'detected' | 'fixing' | 'resolved' | 'failed';
  autoRemediated: boolean;
}

export interface RemediationAction {
  id: string;
  issueId: string;
  deviceId: string;
  action: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  timestamp: string;
  executionTime?: number;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  isRead: boolean;
  deviceId?: string;
}

export interface TopologyNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'server' | 'client';
  status: 'online' | 'offline' | 'warning' | 'critical';
  x: number;
  y: number;
}

export interface TopologyLink {
  source: string;
  target: string;
  status: 'active' | 'degraded' | 'down';
}

export interface Topology {
  nodes: TopologyNode[];
  links: TopologyLink[];
}

export interface DashboardStats {
  totalDevices: number;
  devicesOnline: number;
  devicesOffline: number;
  complianceRate: number;
  activeIssues: number;
  resolvedIssues: number;
  averageRemediationTime: number;
}