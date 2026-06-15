export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createErrorResponse(statusCode: number, message: string, errors?: Record<string, string[]>) {
  return {
    success: false,
    message,
    errors,
    data: null,
  };
}

export function createSuccessResponse(data: any, message: string = 'Success') {
  return {
    success: true,
    message,
    data,
  };
}
