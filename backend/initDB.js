// backend/initDB.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "library.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'available'
  );`, (err) => {
    if (err) console.error(err.message);
    else console.log("Table 'books' created or already exists.");
  });

  // ใส่ตัวอย่างข้อมูลเริ่มต้น
  db.run(`INSERT INTO books (title, author, isbn, status)
          VALUES
          ('Clean Code', 'Robert C. Martin', '9780132350884', 'available'),
          ('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 'available'),
          ('Design Patterns', 'Erich Gamma', '9780201633610', 'borrowed');`, (err) => {
    if (err) console.error(err.message);
    else console.log("Sample books inserted.");
  });
});

db.close();
