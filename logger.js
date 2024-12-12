const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logLevels = ['info', 'warn', 'error'];
    // Automatically resolves the path to 'app.log' relative to the project's root directory
    this.logFilePath = path.join(process.cwd(), 'app.log');
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

    // Append log message to the file
    if (data) {
      // If additional data is provided, convert it to a string and append
      fs.appendFileSync(this.logFilePath, `${logMessage}${JSON.stringify(data)}\n`);
    } else {
      fs.appendFileSync(this.logFilePath, logMessage);
    }

    // Output the log in the console as well
    if (this.logLevels.includes(level)) {
      console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, data);
    } else {
      console.error(`[${timestamp}] [ERROR] Invalid log level: ${level}`);
    }
  }

  info(message, data = null) {
    this.log('log', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
  }
}

module.exports = new Logger();

  // 1. The logger creates a reusable logger instance that can be used throughout the application.
  // 2. Allows you to categorize the logs (info, warn, error).
  // 3. Timestamp: Every log has a timestamp, which is helpful for debugging & monitoring.
  // 4. Data Logging: Can pass add. data like objects or variables with your log message, which will be printed in the log.