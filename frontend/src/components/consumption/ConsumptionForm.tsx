import { useState, FormEvent, useEffect } from 'react';
import { consumptionApi, foodApi } from '../../services/api';
import type { ConsumptionRequest, FoodResponse } from '../../types';

interface ConsumptionFormProps {
  onSuccess?: () => void;
}

export const ConsumptionForm = ({ onSuccess }: ConsumptionFormProps) => {
  const [foods, setFoods] = useState<FoodResponse[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      const foodList = await foodApi.getFoods();
      setFoods(foodList);
      if (foodList.length > 0 && !selectedFoodId) {
        setSelectedFoodId(foodList[0].id);
      }
    } catch (err) {
      setError('Failed to load foods');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFoodId) {
      setError('Please select a food');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const request: ConsumptionRequest = {
        foodId: selectedFoodId as number,
        quantity,
        date,
      };
      await consumptionApi.logConsumption(request);
      if (onSuccess) {
        onSuccess();
      }
      // Reset form
      setQuantity(1);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to log consumption');
    } finally {
      setIsLoading(false);
    }
  };

  if (foods.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">No foods available. Please add foods first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Log Consumption</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="food" className="block text-sm font-medium text-gray-700 mb-1">
            Food
          </label>
          <select
            id="food"
            value={selectedFoodId}
            onChange={(e) => setSelectedFoodId(Number(e.target.value) || '')}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a food</option>
            {foods.map((food) => (
              <option key={food.id} value={food.id}>
                {food.foodName} ({food.caloriesPerServing} cal/serving)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (servings)
          </label>
          <input
            id="quantity"
            type="number"
            min="0.1"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Logging...' : 'Log Consumption'}
        </button>
      </div>
    </form>
  );
};




