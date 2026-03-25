import { APIResponse } from "@/types/chat";

export function createSuccessResponse<T>(data: T): APIResponse<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function createErrorResponse(error: string): APIResponse<null> {
  return {
    success: false,
    data: null,
    error,
  };
}