import express from "express";
import fs from "fs";
import path from "path";
import { CustomError } from "../utils/customError";

const errorHandler = async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);

  // Convertir le code HTTP (par défaut 500 si non spécifié)
  const statusCode = err instanceof CustomError ? parseInt(err.statusCode, 10) || 500 : 500;
  const errorCode = err instanceof CustomError ? err.errorCode : "INTERNAL_SERVER_ERROR";
  const message = err instanceof CustomError ? err.message : "An unexpected error occurred";

  const errorDetails = {
    statusCode: err instanceof CustomError ? err.statusCode : "500",
    errorCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    user: (req as any).decoded?.user?.id || "Not connected",
  };

  // Log error to file
  const logFilePath = path.join(__dirname, '../logs/errors.txt');
  
  const logMessage = JSON.stringify({
    user: errorDetails.user,
    timestamp: errorDetails.timestamp,
    method: errorDetails.method,
    path: errorDetails.path,
    statusCode: errorDetails.statusCode,
    message: errorDetails.message,
  }, null, 2) + "\n";

  try {
    fs.appendFile(logFilePath, logMessage, (error) => {
      if (error) {
        console.error("Failed to write to log file:", error);
      } else {
        console.log("Log written to file successfully.");
      }
    });
  } catch (err) {
    console.error("Error writing to log file:", err);
    res.status(500).json({
      message: "Internal Server Error while writing to log file",
    });
    return;
  }

  res.status(statusCode).json({
    errorCode: errorDetails.errorCode,
    message: errorDetails.message,
    timestamp: errorDetails.timestamp,
    path: errorDetails.path,
    method: errorDetails.method,
  });
};

export default errorHandler;
