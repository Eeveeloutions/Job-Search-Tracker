// DB Password:  XoujwJ73WzTj7Yua9y6IOahB7K762xym
// URI:  postgres://taobaptu:XoujwJ73WzTj7Yua9y6IOahB7K762xym@mahmud.db.elephantsql.com/taobaptu
// postgres://taobaptu:XoujwJ73WzTj7Yua9y6IOahB7K762xym@mahmud.db.elephantsql.com/taobaptu

// Team PostgreSQL login info
// teameevee55@gmail.com
// babyhulk55

// -----------------------------

// const { Pool } = require('pg');
// import { Pool } from "pg";
import * as pg from "pg";
import * as dotenv from "dotenv"; // https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const PG_URI = process.env.PG_URI;
const PASS = process.env.PASS;
// console.log(process.env);
// console.log("PG: ", PG_URI, PASS);

const pool = new pg.Pool({
  connectionString: PG_URI,
  // password: PASS,
  port: 3000,
});

// console.log("Pool details: ", pool);

export default {
  query: (text: any, params?: any, callback?: any): any => {
    console.log("Query executed: ", text);
    return pool.query(text, params, callback);
  },
};

// ----------------------------------

// NOTES

// TABLE CREATION

// CREATE TABLE jobs (
//     id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES users (id),
//     company VARCHAR,
//     title VARCHAR,
//     salary INT,
//     date DATE,
//     applied BOOLEAN,
//     status TEXT CHECK (status IN ('Applied', 'Offered', 'Signed', 'Rejected', 'OA', 'Interviewing')),
//     applied_with VARCHAR
//     )

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     name TEXT NOT NULL,
//     email VARCHAR NOT NULL UNIQUE,
//     pass VARCHAR NOT NULL
//     )

// ...below not working perhaps due to foreign key reference constraint?  [ SEE '\d users' in CLI]
// ALTER TABLE users
// ALTER COLUMN email TYPE VARCHAR NOT NULL UNIQUE

// DROP TABLE <tablename>

// ----------------------------

// CRUD

// JS code for INSERT (users table)
// const queryText = `...`
// `INSERT INTO users
// ('name', 'pass', 'email')
// VALUES ($1, $2, $3)
// RETURNING *;`
// values = ['Jim', 'Tim', 'Fred.com']

// ...INSERT Equivalent for ElephantSQL & CLI
// INSERT INTO users
// (name, pass, email)
// VALUES ('Jim', 'Tim', 'Fred.com');

// INSERT - JS code (jobs table)
// const insertQueryText = `...`
// INSERT INTO jobs
// ('user_id', 'company', 'title', 'salary', 'date', 'applied', 'status', 'applied_with')
// VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
// RETURNING *;
// values = [1, 'Acme', 'Dev', 50, '12/2/2022', TRUE, 'Applied', 'desperation']

// ...INSERT Equivalent for ElephantSQL & CLI
// INSERT INTO jobs
// (user_id, company, title, salary, date, applied, status, applied_with)
// VALUES (1, 'Acme', 'Dev', 50, '12/2/2022', TRUE, 'Applied', 'desperation');

// DELETE - JS code
// const deleteQueryText =
// `DELETE FROM jobs
// WHERE ('user_id') IN  ... [ ('company') , etc. ]
// ($1, $2, $3, ..)
// RETURNING *;`
// values = [1, 3, 4]

// ...DELETE Equivalent for ElephantSQL & CLI
// DELETE FROM jobs <-- deletes ALL rows, but NOT table itself --> DROP TABLE <tablename>
// DELETE FROM jobs WHERE user_id=5;  // single
// DELETE FROM jobs WHERE company IN ('GE', 'GE2');  // multiple

// UPDATE ROW IN TABLE - JS code
// const updateQueryText =
// `UPDATE jobs
// SET company=$1, salary=$2
// WHERE user_id=5
// RETURNING *
// `;
// values = ["SFDC", 100];

// ...UPDATE Equivalent for ElephantSQL & CLI
// UPDATE jobs
// SET company='SFDC', salary=100
// WHERE user_id=5;

// ----------------------------
