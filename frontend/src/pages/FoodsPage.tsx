import { useState, useEffect } from "react";
import { foodApi } from "../services/api";
import { FoodList } from "../components/foods/FoodList";
import { FoodForm } from "../components/foods/FoodForm";
import type { FoodRequest, FoodResponse } from "../types";

export const FoodsPage = () => {
	const [foods, setFoods] = useState<FoodResponse[]>([]);
	const [editingFood, setEditingFood] = useState<FoodResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [minCalories, setMinCalories] = useState("");
	const [maxCalories, setMaxCalories] = useState("");

	const loadFoods = async () => {
		try {
			setIsLoading(true);
			const filters: { minCalories?: number; maxCalories?: number } = {};
			if (minCalories) filters.minCalories = parseFloat(minCalories);
			if (maxCalories) filters.maxCalories = parseFloat(maxCalories);
			const foodList = await foodApi.getFoods(
				Object.keys(filters).length > 0 ? filters : undefined
			);
			setFoods(foodList);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to load foods");
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
		if (window.confirm("Are you sure you want to delete this food?")) {
			try {
				await foodApi.deleteFood(foodId);
				await loadFoods();
			} catch (err: any) {
				setError(
					err.response?.data?.message || "Failed to delete food"
				);
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

			{/* Filter Section */}
			<div className="bg-white p-4 rounded-lg shadow-md mb-6">
				<h2 className="text-lg font-semibold mb-3 text-gray-800">
					Filter Foods
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label
							htmlFor="minCalories"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Min Calories
						</label>
						<input
							id="minCalories"
							type="number"
							min="0"
							step="1"
							value={minCalories}
							onChange={(e) => setMinCalories(e.target.value)}
							placeholder="e.g., 100"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="maxCalories"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Max Calories
						</label>
						<input
							id="maxCalories"
							type="number"
							min="0"
							step="1"
							value={maxCalories}
							onChange={(e) => setMaxCalories(e.target.value)}
							placeholder="e.g., 500"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex items-end space-x-2">
						<button
							onClick={loadFoods}
							className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
						>
							Apply Filter
						</button>
						<button
							onClick={() => {
								setMinCalories("");
								setMaxCalories("");
								setTimeout(loadFoods, 0);
							}}
							className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
						>
							Clear
						</button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div>
					<FoodForm
						food={editingFood}
						onSubmit={editingFood ? handleUpdate : handleCreate}
						onCancel={() => setEditingFood(null)}
					/>
				</div>
				<div>
					<FoodList
						foods={foods}
						onEdit={setEditingFood}
						onDelete={handleDelete}
					/>
				</div>
			</div>
		</div>
	);
};
