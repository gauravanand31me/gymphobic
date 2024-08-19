const { Client } = require('pg');

// Configuration object
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER, // e.g., 'localhost'
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT, // Default PostgreSQL port
  ssl: {
      rejectUnauthorized: false
    }
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
});


