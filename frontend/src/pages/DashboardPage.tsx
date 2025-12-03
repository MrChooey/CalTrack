import { useEffect, useState } from 'react';
import { consumptionApi } from '../services/api';
import { ConsumptionSummary } from '../components/consumption/ConsumptionSummary';
import { ConsumptionForm } from '../components/consumption/ConsumptionForm';
import type { ConsumptionSummaryResponse } from '../types';

export const DashboardPage = () => {
  const [dailySummary, setDailySummary] = useState<ConsumptionSummaryResponse | null>(null);
  const [weeklySummary, setWeeklySummary] = useState<ConsumptionSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSummaries = async () => {
    try {
      setIsLoading(true);
      const [daily, weekly] = await Promise.all([
        consumptionApi.getDailySummary(),
        consumptionApi.getWeeklySummary(),
      ]);
      setDailySummary(daily);
      setWeeklySummary(weekly);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load summaries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSummaries();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {dailySummary && <ConsumptionSummary summary={dailySummary} title="Daily Summary" />}
        {weeklySummary && <ConsumptionSummary summary={weeklySummary} title="Weekly Summary" />}
      </div>
      <div className="max-w-md">
        <ConsumptionForm onSuccess={loadSummaries} />
      </div>
    </div>
  );
};




