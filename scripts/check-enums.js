
const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const res = await client.query(`
    SELECT enumlabel 
    FROM pg_enum 
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
    WHERE typname = 'ProductCategory'
  `);
  console.log("Enum values in DB:", res.rows.map(r => r.enumlabel));
  await client.end();
}

main().catch(console.error);
