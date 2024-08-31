import path from "path";
import fs from "fs";

// Define path were the errors/activities will be saved in:
const errorLogFile = path.resolve(__dirname, "../1-assets/logs/errors.log");
const activityLogFile = path.resolve(__dirname, "../1-assets/logs/activities.log");

// Log new error with a time stamp:
function logError(message: string, err?: any): void {
    const now = new Date();
    let msgToLog = now.toLocaleString() + "\n";
    msgToLog += message + "\n";
    if (typeof err === "string") msgToLog += err + "\n";
    if(err?.stack) msgToLog+= `Stack: ${err.stack}\n`;
    msgToLog += "-----------------------------------------\n";
    fs.appendFile(errorLogFile, msgToLog, () => { });
}

// Log new activity with a time stamp:
function logActivity(message: string): void {
    const now = new Date();
    let msgToLog = now.toLocaleString() + "\n";
    msgToLog += message + "\n";
    msgToLog += "-----------------------------------------\n";
    fs.appendFile(activityLogFile, msgToLog, () => { });
}

export default {
    logError,
    logActivity
};