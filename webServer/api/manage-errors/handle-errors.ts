import { NextFunction, Request, Response } from "express";
import { httpCodes } from "../utils/constants";
import { AppError } from "./AppError";

/**
 * Hnadle errors in Express aplication
 * It's compulsory put 4 arguments in this function to be a handle error function of Express,
 * respect the order of arguments
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.log(err.stack);        // View where is the error
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
        if (err.name === 'ValidationError') err.statusCode = httpCodes.bad_request;
        if (err.name === 'JsonWebTokenError') err.statusCode = httpCodes.bad_request;
        if (err.name === 'TokenExpiredError') err.statusCode = httpCodes.bad_request;
        sendErrorDev(err, req, res);
    }else{
        let error = JSON.parse(JSON.stringify(err));
        error.message = err.message;
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
}

/**
 * Manage error in mode development. Show the whole info of error
 */
const sendErrorDev = (err: any, req: Request, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
}

/**
 * Manage error in mode production. Shoe a pretty message with sent error
 */
const sendErrorProd = (err: any, req: Request, res: Response) => {
    // 1) Operational error
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // 2) Programming error
    return res.status(500).json({
        status: 'error',
        message: 'Ups! An error has occured. Try again later'
    });
}

/**
 * Handle error in acces of bbdd
 */
const handleCastErrorDB = (error: any) => {
    const message = `Inválido ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
}

/**
 * Manage error provides of validation in values with unique = true property
 * in mongoose's schemas
 */
const handleDuplicateFieldsDB = (error: any) => {
    const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicated field with value: ${value}. Please, enter other value`;
    return new AppError(message, 400);
}

/**
 * Manage error provides of validation in mongoose's schemas
 */
const handleValidationErrorDB = (error: any) => {
    const errors = Object.values(error.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

/**
 * Handle error with token of JWT
 */
const handleJWTError = () => 
    new AppError('Invalid token. Please, login again', 401);

/**
 * Handle error with expired token
 */
const handleJWTExpiredError = () => 
    new AppError('Your token has expired. Please, login again', 401);