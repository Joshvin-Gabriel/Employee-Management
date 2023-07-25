// Response model for success response
class SuccessResponse {
    constructor(message, data = null) {
      this.success = true;
      this.message = message;
      this.data = data;
    }
  }
  
  // Response model for error response
  class ErrorResponse {
    constructor(error) {
      this.success = false;
      this.error = error;
    }
  }
  
  export {
    SuccessResponse,
    ErrorResponse,
  };
  