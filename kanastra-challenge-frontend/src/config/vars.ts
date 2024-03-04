export const API_BASE_URL =
  process.env.VITE_APP_API_PUBLIC_BASE_URL ?? "http://localhost:8000/api";

export const MOCK_MODE = process.env.VITE_APP_MOCK_MODE === "true" ?? false;
