import pg from 'pg'
const { Pool } = pg
 

require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE });

module.exports = pool;