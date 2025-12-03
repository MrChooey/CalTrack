import type { FoodResponse } from '../../types';

interface FoodItemProps {
  food: FoodResponse;
  onEdit: (food: FoodResponse) => void;
  onDelete: (foodId: number) => void;
}

export const FoodItem = ({ food, onEdit, onDelete }: FoodItemProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {food.foodName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {food.caloriesPerServing} cal
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(food)}
          className="text-blue-600 hover:text-blue-900 mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(food.id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};




