import { FoodItem } from './FoodItem';
import type { FoodResponse } from '../../types';

interface FoodListProps {
  foods: FoodResponse[];
  onEdit: (food: FoodResponse) => void;
  onDelete: (foodId: number) => void;
}

export const FoodList = ({ foods, onEdit, onDelete }: FoodListProps) => {
  if (foods.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
        No foods added yet. Add your first food item!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calories per Serving
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods.map((food) => (
              <FoodItem key={food.id} food={food} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




