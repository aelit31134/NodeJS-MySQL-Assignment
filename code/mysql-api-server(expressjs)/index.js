const express = require("express");
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'new_schema',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

const app = express();
const port = 3060;

app.use(express.text());

app.get("/", async (req, res) => {
  console.log(req.body);
  const result = await executeQuery(req.body);
  res.send(JSON.stringify(result));
});

async function executeQuery(query) {
  const [rows, _fields] = await connection.execute(query);
  return rows;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
