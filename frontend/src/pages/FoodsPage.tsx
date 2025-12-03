import { useState, useEffect } from 'react';
import { foodApi } from '../services/api';
import { FoodList } from '../components/foods/FoodList';
import { FoodForm } from '../components/foods/FoodForm';
import type { FoodRequest, FoodResponse } from '../types';

export const FoodsPage = () => {
  const [foods, setFoods] = useState<FoodResponse[]>([]);
  const [editingFood, setEditingFood] = useState<FoodResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFoods = async () => {
    try {
      setIsLoading(true);
      const foodList = await foodApi.getFoods();
      setFoods(foodList);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load foods');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleCreate = async (data: FoodRequest) => {
    await foodApi.createFood(data);
    await loadFoods();
  };

  const handleUpdate = async (data: FoodRequest) => {
    if (!editingFood) return;
    await foodApi.updateFood(editingFood.id, data);
    setEditingFood(null);
    await loadFoods();
  };

  const handleDelete = async (foodId: number) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await foodApi.deleteFood(foodId);
        await loadFoods();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete food');
      }
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Foods</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <FoodForm
            food={editingFood}
            onSubmit={editingFood ? handleUpdate : handleCreate}
            onCancel={() => setEditingFood(null)}
          />
        </div>
        <div>
          <FoodList foods={foods} onEdit={setEditingFood} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};




