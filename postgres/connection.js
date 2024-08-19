const { Client } = require('pg');

// Configuration object
const client = new Client({
  user: 'postgres',
  host: 'localhost', // e.g., 'localhost'
  database: 'postgres',
  password: 'Sourav@1992',
  port: 5432, // Default PostgreSQL port
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
});