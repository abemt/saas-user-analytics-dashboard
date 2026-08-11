import { StatCardData, ActivityLog, TimeSeriesData, ProjectData } from '../types';

const daysAgo = (days: number): Date => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

const generateTimeSeriesData = (numDays: number): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const date = daysAgo(i);
    data.push({
      date,
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      logins: Math.floor(Math.random() * (400 - 150 + 1)) + 150,
      signups: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    });
  }
  return data;
};

export const mockTimeSeries = generateTimeSeriesData(90);

export const mockStatCards: StatCardData[] = [
  { title: 'Total Logins', value: '10,482', change: '+12.5%', changeType: 'increase' },
  { title: 'Active Projects', value: '340', change: '+2.1%', changeType: 'increase' },
  { title: 'New Users', value: '89', change: '-1.8%', changeType: 'decrease' },
  { title: 'Reports Generated', value: '1,204', change: '+5.7%', changeType: 'increase' },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 1, user: { name: 'Alex Johnson', avatar: 'https://picsum.photos/id/1011/100' }, action: 'Updated project "Phoenix"', timestamp: daysAgo(0), status: 'Completed' },
  { id: 2, user: { name: 'Maria Garcia', avatar: 'https://picsum.photos/id/1012/100' }, action: 'Generated quarterly report', timestamp: daysAgo(1), status: 'Completed' },
  { id: 3, user: { name: 'James Smith', avatar: 'https://picsum.photos/id/1013/100' }, action: 'Failed login attempt', timestamp: daysAgo(2), status: 'Failed' },
  { id: 4, user: { name: 'Patricia Brown', avatar: 'https://picsum.photos/id/1014/100' }, action: 'Invited a new user', timestamp: daysAgo(5), status: 'Completed' },
  { id: 5, user: { name: 'Michael Miller', avatar: 'https://picsum.photos/id/1015/100' }, action: 'Data export is processing', timestamp: daysAgo(8), status: 'Pending' },
  { id: 6, user: { name: 'Linda Davis', avatar: 'https://picsum.photos/id/1016/100' }, action: 'Created new project "Godzilla"', timestamp: daysAgo(12), status: 'Completed' },
  { id: 7, user: { name: 'Robert Wilson', avatar: 'https://picsum.photos/id/1018/100' }, action: 'Updated user permissions', timestamp: daysAgo(15), status: 'Completed' },
  { id: 8, user: { name: 'Jennifer Martinez', avatar: 'https://picsum.photos/id/1025/100' }, action: 'Deleted task "Deploy to production"', timestamp: daysAgo(25), status: 'Completed' },
  { id: 9, user: { name: 'William Anderson', avatar: 'https://picsum.photos/id/102/100' }, action: 'Commented on "Q3 Goals"', timestamp: daysAgo(35), status: 'Completed' },
  { id: 10, user: { name: 'David Thomas', avatar: 'https://picsum.photos/id/103/100' }, action: 'Archived project "Legacy System"', timestamp: daysAgo(45), status: 'Completed' },
  { id: 11, user: { name: 'Susan Clark', avatar: 'https://picsum.photos/id/104/100' }, action: 'Generated new API key', timestamp: daysAgo(60), status: 'Completed' },
  { id: 12, user: { name: 'Joseph Lewis', avatar: 'https://picsum.photos/id/105/100' }, action: 'Updated billing information', timestamp: daysAgo(80), status: 'Completed' },
];

export const mockProjects: ProjectData[] = [
  { name: 'Phoenix', tasks: 45 }, { name: 'Godzilla', tasks: 89 },
  { name: 'Orion', tasks: 12 }, { name: 'Pegasus', tasks: 56 }, { name: 'Vortex', tasks: 22 },
];
