import { useState, useEffect } from 'react';
import { goalApi } from '../services/api';
import { GoalForm } from '../components/goals/GoalForm';
import type { GoalRequest, GoalResponse } from '../types';

export const GoalsPage = () => {
  const [goal, setGoal] = useState<GoalResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGoal = async () => {
    try {
      setIsLoading(true);
      const goalData = await goalApi.getGoals();
      setGoal(goalData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load goals');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGoal();
  }, []);

  const handleSubmit = async (data: GoalRequest) => {
    try {
      let result: GoalResponse;
      if (goal) {
        result = await goalApi.updateGoals(data);
      } else {
        result = await goalApi.setGoals(data);
      }
      setGoal(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save goals');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Calorie Goals</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="max-w-md">
        <GoalForm goal={goal} onSubmit={handleSubmit} />
        {goal && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-700">Current Goals</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>
                Daily: {goal.dailyGoal ? `${goal.dailyGoal} calories` : 'Not set'}
              </div>
              <div>
                Weekly: {goal.weeklyGoal ? `${goal.weeklyGoal} calories` : 'Not set'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};




