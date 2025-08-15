import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Employee } from '@/lib/data/employees';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get<Employee[]>('/employees');
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'avatar' | 'joined'>) => {
    try {
      const newEmployee = await apiClient.post<Employee>('/employees', employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
      throw err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    createEmployee,
  };
}