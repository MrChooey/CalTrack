import axios, { AxiosError } from "axios";
import type {
	RegisterRequest,
	LoginRequest,
	AuthResponse,
	UserProfileResponse,
	UserProfileUpdateRequest,
	FoodRequest,
	FoodResponse,
	GoalRequest,
	GoalResponse,
	ConsumptionRequest,
	ConsumptionSummaryResponse,
} from "../types";

// Use explicit VITE_API_BASE_URL when provided. In dev, prefer a relative URL
// so Vite's dev-server proxy (running on :5173) forwards requests to the
// backend and cookies are same-origin from the browser's perspective.
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ??
	(import.meta.env.DEV ? "" : "http://localhost:8080");

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true, // Important for session cookies
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for error handling
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			// Unauthorized - session expired or invalid
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

// Auth API
export const authApi = {
	register: async (data: RegisterRequest): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>("/auth/register", data);
		return response.data;
	},

	login: async (data: LoginRequest): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>("/auth/login", data);
		return response.data;
	},

	logout: async (): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>("/auth/logout");
		return response.data;
	},
};

// User API
export const userApi = {
	getProfile: async (): Promise<UserProfileResponse> => {
		const response = await api.get<UserProfileResponse>("/users/profile");
		return response.data;
	},

	updateProfile: async (
		data: UserProfileUpdateRequest
	): Promise<UserProfileResponse> => {
		const response = await api.put<UserProfileResponse>(
			"/users/profile",
			data
		);
		return response.data;
	},
};

// Food API
export const foodApi = {
	getFoods: async (filters?: {
		minCalories?: number;
		maxCalories?: number;
	}): Promise<FoodResponse[]> => {
		const params: Record<string, number> = {};
		if (filters?.minCalories !== undefined) {
			params.minCalories = filters.minCalories;
		}
		if (filters?.maxCalories !== undefined) {
			params.maxCalories = filters.maxCalories;
		}
		const response = await api.get<FoodResponse[]>("/foods", { params });
		return response.data;
	},

	createFood: async (data: FoodRequest): Promise<FoodResponse> => {
		const response = await api.post<FoodResponse>("/foods", data);
		return response.data;
	},

	updateFood: async (
		foodId: number,
		data: FoodRequest
	): Promise<FoodResponse> => {
		const response = await api.put<FoodResponse>(`/foods/${foodId}`, data);
		return response.data;
	},

	deleteFood: async (foodId: number): Promise<void> => {
		await api.delete(`/foods/${foodId}`);
	},
};

// Goal API
export const goalApi = {
	getGoals: async (): Promise<GoalResponse | null> => {
		try {
			const response = await api.get<GoalResponse>("/goals");
			return response.data;
		} catch (error) {
			if ((error as AxiosError).response?.status === 404) {
				return null;
			}
			throw error;
		}
	},

	setGoals: async (data: GoalRequest): Promise<GoalResponse> => {
		const response = await api.post<GoalResponse>("/goals", data);
		return response.data;
	},

	updateGoals: async (data: GoalRequest): Promise<GoalResponse> => {
		const response = await api.put<GoalResponse>("/goals", data);
		return response.data;
	},
};

// Consumption API
export const consumptionApi = {
	logConsumption: async (data: ConsumptionRequest): Promise<void> => {
		await api.post("/consumption", data);
	},

	getDailySummary: async (
		date?: string
	): Promise<ConsumptionSummaryResponse> => {
		const params = date ? { date } : {};
		const response = await api.get<ConsumptionSummaryResponse>(
			"/consumption/daily",
			{ params }
		);
		return response.data;
	},

	getWeeklySummary: async (
		date?: string
	): Promise<ConsumptionSummaryResponse> => {
		const params = date ? { date } : {};
		const response = await api.get<ConsumptionSummaryResponse>(
			"/consumption/weekly",
			{ params }
		);
		return response.data;
	},
};

export default api;
