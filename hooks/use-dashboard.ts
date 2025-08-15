import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { KPI, TeamMember } from '@/lib/data/dashboard';

interface DashboardData {
  kpis: KPI[];
  salesData: Array<{ month: string; sales: number }>;
  teamDirectory: TeamMember[];
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await apiClient.get<DashboardData>('/dashboard');
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}