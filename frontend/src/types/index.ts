// Authentication DTOs
export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	age?: number;
	height?: number;
	weight?: number;
	activities?: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	message: string;
	profile?: UserProfileResponse;
}

// User DTOs
export interface UserProfileResponse {
	id: number;
	name: string;
	email: string;
	age?: number;
	height?: number;
	weight?: number;
	activities?: string;
}

export interface UserProfileUpdateRequest {
	name?: string;
	age?: number;
	height?: number;
	weight?: number;
	activities?: string;
}

// Food DTOs
export interface FoodRequest {
	foodName: string;
	caloriesPerServing: number;
	imageUrl?: string;
}

export interface FoodResponse {
	id: number;
	userId: number;
	foodName: string;
	caloriesPerServing: number;
	imageUrl?: string;
}

// Goal DTOs
export interface GoalRequest {
	dailyGoal?: number;
	weeklyGoal?: number;
}

export interface GoalResponse {
	id: number;
	userId: number;
	dailyGoal?: number;
	weeklyGoal?: number;
}

// Consumption DTOs
export interface ConsumptionRequest {
	foodId: number;
	quantity?: number;
	date?: string; // ISO date string
}

export interface ConsumptionSummaryResponse {
	window: string;
	totalCalories: number;
	goalCalories?: number;
	remainingCalories?: number;
}
