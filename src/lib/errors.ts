export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Không tìm thấy tài nguyên") {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Bạn cần đăng nhập để thực hiện thao tác này") {
    super(message, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Dữ liệu không hợp lệ") {
    super(message, 422);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Quá nhiều yêu cầu, vui lòng thử lại sau") {
    super(message, 429);
  }
}
