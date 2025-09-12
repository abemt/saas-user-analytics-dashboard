export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface ActivityLog {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: Date;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface TimeSeriesData {
  date: Date;
  name: string;
  logins: number;
  signups: number;
}

export interface ProjectData {
  name: string;
  tasks: number;
}