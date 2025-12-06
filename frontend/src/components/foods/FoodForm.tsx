import { useState, FormEvent, useEffect } from "react";
import type { FoodRequest, FoodResponse } from "../../types";

interface FoodFormProps {
	food?: FoodResponse | null;
	onSubmit: (data: FoodRequest) => Promise<void>;
	onCancel: () => void;
}

export const FoodForm = ({ food, onSubmit, onCancel }: FoodFormProps) => {
	const [formData, setFormData] = useState({
		foodName: "",
		caloriesPerServing: "",
		imageUrl: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (food) {
			setFormData({
				foodName: food.foodName,
				caloriesPerServing: food.caloriesPerServing.toString(),
				imageUrl: food.imageUrl || "",
			});
		}
	}, [food]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		const calories = parseFloat(formData.caloriesPerServing);
		if (isNaN(calories) || calories <= 0) {
			setError("Calories per serving must be a positive number");
			return;
		}

		setIsLoading(true);
		try {
			await onSubmit({
				foodName: formData.foodName,
				caloriesPerServing: calories,
				imageUrl: formData.imageUrl || undefined,
			});
			// Reset form if not editing
			if (!food) {
				setFormData({
					foodName: "",
					caloriesPerServing: "",
					imageUrl: "",
				});
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to save food");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-md"
		>
			<h3 className="text-xl font-semibold mb-4 text-gray-800">
				{food ? "Edit Food" : "Add New Food"}
			</h3>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}
			<div className="space-y-4">
				<div>
					<label
						htmlFor="foodName"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Food Name
					</label>
					<input
						id="foodName"
						type="text"
						value={formData.foodName}
						onChange={(e) =>
							setFormData({
								...formData,
								foodName: e.target.value,
							})
						}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="caloriesPerServing"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Calories per Serving
					</label>
					<input
						id="caloriesPerServing"
						type="number"
						min="0.1"
						step="0.1"
						value={formData.caloriesPerServing}
						onChange={(e) =>
							setFormData({
								...formData,
								caloriesPerServing: e.target.value,
							})
						}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="imageUrl"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Image URL (optional)
					</label>
					<input
						id="imageUrl"
						type="url"
						value={formData.imageUrl}
						onChange={(e) =>
							setFormData({
								...formData,
								imageUrl: e.target.value,
							})
						}
						placeholder="https://example.com/food-image.jpg"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex space-x-3">
					<button
						type="submit"
						disabled={isLoading}
						className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
					>
						{isLoading ? "Saving..." : food ? "Update" : "Add Food"}
					</button>
					{food && (
						<button
							type="button"
							onClick={onCancel}
							className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
						>
							Cancel
						</button>
					)}
				</div>
			</div>
		</form>
	);
};
