import { useState, FormEvent, useEffect } from 'react';
import type { GoalRequest, GoalResponse } from '../../types';

interface GoalFormProps {
  goal: GoalResponse | null;
  onSubmit: (data: GoalRequest) => Promise<void>;
}

export const GoalForm = ({ goal, onSubmit }: GoalFormProps) => {
  const [formData, setFormData] = useState({
    dailyGoal: '',
    weeklyGoal: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (goal) {
      setFormData({
        dailyGoal: goal.dailyGoal?.toString() || '',
        weeklyGoal: goal.weeklyGoal?.toString() || '',
      });
    }
  }, [goal]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const daily = formData.dailyGoal ? parseFloat(formData.dailyGoal) : undefined;
    const weekly = formData.weeklyGoal ? parseFloat(formData.weeklyGoal) : undefined;

    if (daily !== undefined && (isNaN(daily) || daily <= 0)) {
      setError('Daily goal must be a positive number');
      return;
    }
    if (weekly !== undefined && (isNaN(weekly) || weekly <= 0)) {
      setError('Weekly goal must be a positive number');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({ dailyGoal: daily, weeklyGoal: weekly });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save goals');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Set Calorie Goals</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700 mb-1">
            Daily Goal (calories)
          </label>
          <input
            id="dailyGoal"
            type="number"
            min="0.1"
            step="0.1"
            value={formData.dailyGoal}
            onChange={(e) => setFormData({ ...formData, dailyGoal: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 2000"
          />
        </div>
        <div>
          <label htmlFor="weeklyGoal" className="block text-sm font-medium text-gray-700 mb-1">
            Weekly Goal (calories)
          </label>
          <input
            id="weeklyGoal"
            type="number"
            min="0.1"
            step="0.1"
            value={formData.weeklyGoal}
            onChange={(e) => setFormData({ ...formData, weeklyGoal: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 14000"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Saving...' : 'Save Goals'}
        </button>
      </div>
    </form>
  );
};




