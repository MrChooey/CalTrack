import type { ConsumptionSummaryResponse } from '../../types';

interface ConsumptionSummaryProps {
  summary: ConsumptionSummaryResponse;
  title: string;
}

export const ConsumptionSummary = ({ summary, title }: ConsumptionSummaryProps) => {
  const progressPercentage = summary.goalCalories
    ? Math.min((summary.totalCalories / summary.goalCalories) * 100, 100)
    : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-3">
        <div className="text-sm text-gray-600">Period: {summary.window}</div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Total Calories:</span>
          <span className="text-2xl font-bold text-blue-600">{summary.totalCalories.toFixed(0)}</span>
        </div>
        {summary.goalCalories && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Goal:</span>
              <span className="text-xl font-semibold text-gray-800">{summary.goalCalories.toFixed(0)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  progressPercentage >= 100 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Remaining:</span>
              <span
                className={`text-xl font-semibold ${
                  (summary.remainingCalories || 0) < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {summary.remainingCalories?.toFixed(0) || 0}
              </span>
            </div>
          </>
        )}
        {!summary.goalCalories && (
          <div className="text-sm text-gray-500 italic">No goal set for this period</div>
        )}
      </div>
    </div>
  );
};




