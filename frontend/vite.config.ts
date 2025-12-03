import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxy API calls to Spring Boot backend so cookies are same-site during dev
			"/auth": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
			"/users": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
			"/foods": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
			"/goals": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
			"/consumption": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
