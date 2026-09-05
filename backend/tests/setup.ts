/**
 * Setup file for Jest tests
 */
// Declare global process type since @types/node may not be installed
declare var process: {
  env: any;
};

// Set environment variables if not already set
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test') {
  // Use default values for testing
  process.env.LOG_LEVEL = 'debug';
}