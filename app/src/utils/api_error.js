class ApiError extends Error {
  
  constructor(code, message) {
    super(); 
    this.code = code;
    this.message = message;
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }

}

module.exports = ApiError;
