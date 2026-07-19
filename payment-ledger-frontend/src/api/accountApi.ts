import api from "./api";
import type { Account } from "../types/account";
import type { ApiResponse } from "../types/api";

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get<ApiResponse<Account[]>>("/accounts");

  return response.data.data;
}