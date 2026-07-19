import api from "./api";

import type { HealthResponse } from "../types/health";

export async function getHealth() {
  const response = await api.get<HealthResponse>("/health");

  return response.data;
}