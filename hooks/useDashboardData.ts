import { useEffect, useState } from 'react';
import { StatCardData, ActivityLog, TimeSeriesData, ProjectData } from '../types';
import { mockStatCards, mockTimeSeries, mockActivityLogs, mockProjects } from '../data/mockData';

const API_URL: string | undefined = (import.meta as any).env?.VITE_API_URL;

interface DashboardData {
  statCards: StatCardData[];
  timeSeries: TimeSeriesData[];
  logs: ActivityLog[];
  projects: ProjectData[];
  source: 'live' | 'mock';
  loading: boolean;
}

let cachedToken: string | null = null;

async function login(): Promise<string> {
  if (cachedToken) return cachedToken;
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email: 'demo@abemt.dev', password: 'password' }),
  });
  if (!res.ok) throw new Error(`login failed: ${res.status}`);
  cachedToken = (await res.json()).token;
  return cachedToken!;
}

async function apiGet(path: string, token: string): Promise<any> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json();
}

const formatChange = (pct: number | null): Pick<StatCardData, 'change' | 'changeType'> => ({
  change: pct === null ? '—' : `${pct > 0 ? '+' : ''}${pct}%`,
  changeType: pct !== null && pct < 0 ? 'decrease' : 'increase',
});

const statusFor = (type: string): ActivityLog['status'] =>
  type === 'report_generated' ? 'Pending' : 'Completed';

export function useDashboardData(dateRange: number): DashboardData {
  const [data, setData] = useState<DashboardData>({
    statCards: mockStatCards,
    timeSeries: mockTimeSeries.slice(-dateRange),
    logs: mockActivityLogs,
    projects: mockProjects,
    source: 'mock',
    loading: Boolean(API_URL),
  });

  useEffect(() => {
    // No API configured (e.g. the Vercel demo build): stay on mock data
    if (!API_URL) {
      setData((d) => ({ ...d, timeSeries: mockTimeSeries.slice(-dateRange), source: 'mock', loading: false }));
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const token = await login();
        const [overview, activity, projectStats, activities] = await Promise.all([
          apiGet(`/api/stats/overview?range=${dateRange}`, token),
          apiGet(`/api/stats/activity?range=${dateRange}`, token),
          apiGet('/api/projects/stats', token),
          apiGet('/api/activities?per_page=50', token),
        ]);
        if (cancelled) return;

        const m = overview.metrics;
        setData({
          statCards: [
            { title: 'Total Logins', value: m.logins.value.toLocaleString(), ...formatChange(m.logins.change_pct) },
            { title: 'Active Projects', value: m.active_projects.value.toLocaleString(), ...formatChange(m.active_projects.change_pct) },
            { title: 'New Users', value: m.signups.value.toLocaleString(), ...formatChange(m.signups.change_pct) },
            { title: 'Reports Generated', value: m.reports_generated.value.toLocaleString(), ...formatChange(m.reports_generated.change_pct) },
          ],
          timeSeries: activity.series.map((p: any) => ({
            date: new Date(p.date),
            name: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            logins: p.logins,
            signups: p.signups,
          })),
          logs: activities.data.map((e: any) => ({
            id: e.id,
            user: {
              name: e.actor_name,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(e.actor_name)}&background=random`,
            },
            action: e.description,
            timestamp: new Date(e.occurred_at),
            status: statusFor(e.type),
          })),
          projects: projectStats.projects.map((p: any) => ({ name: p.name, tasks: p.tasks_count })),
          source: 'live',
          loading: false,
        });
      } catch (err) {
        console.warn('API unavailable, falling back to mock data:', err);
        if (!cancelled) {
          setData((d) => ({ ...d, timeSeries: mockTimeSeries.slice(-dateRange), source: 'mock', loading: false }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dateRange]);

  return data;
}
