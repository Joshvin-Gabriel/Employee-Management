import dotenv from 'dotenv';

// Load environment variables from config.env file
dotenv.config({ path: 'config.env' });

module.exports = process.env;