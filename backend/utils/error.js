export const createErrror = (statusCode, message)=>{
    const error = new error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
}