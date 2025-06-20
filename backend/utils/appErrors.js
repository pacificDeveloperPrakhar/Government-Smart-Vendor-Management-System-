module.exports = class appError extends Error {
    constructor(message, errCode,errStack=null) {
      super(message);
      //try doing this.mssg rathre than this.message because message is the property of its prototype object
      this.mssg = message;
      this["status code"] = errCode || 500;
      this.isOperational = false;
      this.errStack=errStack||null
      Error.captureStackTrace(this,this.constructor)
    }
  };