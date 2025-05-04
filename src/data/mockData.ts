import { 
  Device, 
  ConfigIssue, 
  RemediationAction, 
  Alert, 
  Topology,
  DashboardStats
} from '../types';

export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Core-Router-01',
    type: 'router',
    ip: '192.168.1.1',
    status: 'online',
    lastChecked: new Date().toISOString(),
    complianceScore: 98,
    location: 'Data Center A'
  },
  {
    id: '2',
    name: 'Edge-Switch-01',
    type: 'switch',
    ip: '192.168.1.2',
    status: 'warning',
    lastChecked: new Date().toISOString(),
    complianceScore: 76,
    location: 'Office Floor 1'
  },
  {
    id: '3',
    name: 'Firewall-North',
    type: 'firewall',
    ip: '192.168.1.3',
    status: 'critical',
    lastChecked: new Date().toISOString(),
    complianceScore: 45,
    location: 'Data Center A'
  },
  {
    id: '4',
    name: 'Core-Switch-02',
    type: 'switch',
    ip: '192.168.1.4',
    status: 'online',
    lastChecked: new Date().toISOString(),
    complianceScore: 100,
    location: 'Data Center B'
  },
  {
    id: '5',
    name: 'Edge-Router-02',
    type: 'router',
    ip: '192.168.1.5',
    status: 'online',
    lastChecked: new Date().toISOString(),
    complianceScore: 92,
    location: 'Office Floor 2'
  },
  {
    id: '6',
    name: 'Firewall-South',
    type: 'firewall',
    ip: '192.168.1.6',
    status: 'warning',
    lastChecked: new Date().toISOString(),
    complianceScore: 82,
    location: 'Data Center B'
  },
  {
    id: '7',
    name: 'Access-Switch-01',
    type: 'switch',
    ip: '192.168.1.7',
    status: 'offline',
    lastChecked: new Date(Date.now() - 3600000).toISOString(),
    complianceScore: 0,
    location: 'Office Floor 3'
  },
];

export const mockConfigIssues: ConfigIssue[] = [
  {
    id: '1',
    deviceId: '2',
    severity: 'medium',
    description: 'SNMP community string set to default',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    status: 'detected',
    autoRemediated: false
  },
  {
    id: '2',
    deviceId: '3',
    severity: 'critical',
    description: 'Firewall rule allowing all incoming traffic',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'fixing',
    autoRemediated: true
  },
  {
    id: '3',
    deviceId: '3',
    severity: 'high',
    description: 'SSH using weak cipher suites',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'resolved',
    autoRemediated: true
  },
  {
    id: '4',
    deviceId: '6',
    severity: 'medium',
    description: 'NTP server misconfigured',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    status: 'failed',
    autoRemediated: true
  },
];

export const mockRemediationActions: RemediationAction[] = [
  {
    id: '1',
    issueId: '2',
    deviceId: '3',
    action: 'Applying secure firewall rule configuration',
    status: 'in-progress',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    issueId: '3',
    deviceId: '3',
    action: 'Updated SSH configuration to use secure ciphers',
    status: 'completed',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    executionTime: 45
  },
  {
    id: '3',
    issueId: '4',
    deviceId: '6',
    action: 'Reconfiguring NTP server settings',
    status: 'failed',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    executionTime: 120
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Critical Firewall Misconfiguration',
    message: 'Firewall-North has a rule allowing all incoming traffic',
    type: 'error',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    deviceId: '3'
  },
  {
    id: '2',
    title: 'Auto-remediation Started',
    message: 'Self-healing process initiated for Firewall-North',
    type: 'info',
    timestamp: new Date(Date.now() - 3550000).toISOString(),
    isRead: false,
    deviceId: '3'
  },
  {
    id: '3',
    title: 'Device Offline',
    message: 'Access-Switch-01 is not responding',
    type: 'warning',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
    isRead: true,
    deviceId: '7'
  },
  {
    id: '4',
    title: 'SSH Configuration Fixed',
    message: 'SSH cipher suites have been updated on Firewall-North',
    type: 'success',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isRead: true,
    deviceId: '3'
  },
];

export const mockTopology: Topology = {
  nodes: [
    { id: '1', name: 'Core-Router-01', type: 'router', status: 'online', x: 50, y: 50 },
    { id: '2', name: 'Edge-Switch-01', type: 'switch', status: 'warning', x: 200, y: 100 },
    { id: '3', name: 'Firewall-North', type: 'firewall', status: 'critical', x: 100, y: 200 },
    { id: '4', name: 'Core-Switch-02', type: 'switch', status: 'online', x: 300, y: 150 },
    { id: '5', name: 'Edge-Router-02', type: 'router', status: 'online', x: 400, y: 50 },
    { id: '6', name: 'Firewall-South', type: 'firewall', status: 'warning', x: 350, y: 250 },
    { id: '7', name: 'Access-Switch-01', type: 'switch', status: 'offline', x: 250, y: 300 },
    { id: '8', name: 'Web-Server-01', type: 'server', status: 'online', x: 150, y: 350 },
    { id: '9', name: 'DB-Server-01', type: 'server', status: 'online', x: 300, y: 400 },
    { id: '10', name: 'Client-PC-01', type: 'client', status: 'online', x: 450, y: 350 },
  ],
  links: [
    { source: '1', target: '2', status: 'active' },
    { source: '1', target: '3', status: 'active' },
    { source: '1', target: '5', status: 'active' },
    { source: '2', target: '4', status: 'degraded' },
    { source: '3', target: '4', status: 'active' },
    { source: '4', target: '6', status: 'active' },
    { source: '5', target: '6', status: 'active' },
    { source: '2', target: '7', status: 'down' },
    { source: '4', target: '7', status: 'down' },
    { source: '3', target: '8', status: 'active' },
    { source: '6', target: '9', status: 'active' },
    { source: '7', target: '10', status: 'down' },
  ]
};

export const mockDashboardStats: DashboardStats = {
  totalDevices: 7,
  devicesOnline: 5,
  devicesOffline: 2,
  complianceRate: 85,
  activeIssues: 3,
  resolvedIssues: 12,
  averageRemediationTime: 52,
};