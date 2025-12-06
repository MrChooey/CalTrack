import type { FoodResponse } from "../../types";

interface FoodItemProps {
	food: FoodResponse;
	onEdit: (food: FoodResponse) => void;
	onDelete: (foodId: number) => void;
}

export const FoodItem = ({ food, onEdit, onDelete }: FoodItemProps) => {
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					{food.imageUrl && (
						<div className="relative h-12 w-12 mr-3 flex-shrink-0">
							<img
								src={food.imageUrl}
								alt={food.foodName}
								className="h-full w-full rounded-md object-cover"
								onError={(e) => {
									console.error(`Failed to load image: ${food.imageUrl}`);
									const target = e.target as HTMLImageElement;
									target.style.display = "none";
									// Show placeholder on error
									const parent = target.parentElement;
									if (parent && !parent.querySelector('.error-placeholder')) {
										const placeholder = document.createElement("div");
										placeholder.className = "error-placeholder h-full w-full rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-xs";
										placeholder.innerHTML = "❌";
										parent.appendChild(placeholder);
									}
								}}
								onLoad={() => {
									console.log(`✅ Image loaded: ${food.imageUrl}`);
								}}
							/>
						</div>
					)}
					<span className="text-sm font-medium text-gray-900">
						{food.foodName}
					</span>
				</div>
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
