// DB Password:  XoujwJ73WzTj7Yua9y6IOahB7K762xym
// URI:  postgres://taobaptu:XoujwJ73WzTj7Yua9y6IOahB7K762xym@mahmud.db.elephantsql.com/taobaptu

// Team PostgreSQL login info
// teameevee55@gmail.com
// babyhulk55

// -----------------------------

const { Pool } = require("pg");

const PG_URI = process.env.PG_URI;
const PASS = process.env.PASS;

const pool = new Pool({
  connectionString: PG_URI,
  password: PASS,
});

module.exports = {
  query: (text: string, params: any[], callback: Function) => {
    console.log("Query executed: ", text);
    return pool.query(text, params, callback);
  },
};

// FOR WORKING IN THIS SINGLE .js FILE ONLY -- document out
// const db = {
//   query: (
//     text: string,
//     params?: any[],
//     callback?: (err: Error, result: any) => void
//   ) => {
//     console.log("Query executed: ", text);
//     return pool.query(text, params, callback);
//   },
// };

// ----------------------------------

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
ALTER COLUMN email VARCHAR NOT NULL UNIQUE
// ----------------------------

// "@types/cookie-session": "^2.0.42",
// "@types/express": "^4.17.11",
// "@types/jsonwebtoken": "^8.5.0",
// jest dependencies

// userModel
// cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now },

// jwt.verify - SEARCH

// ----------------------------
