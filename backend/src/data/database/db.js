// backend/src/data/database/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// สร้าง/เชื่อมต่อ database library.db
const dbPath = path.join(__dirname, "../../../library.db"); // ปรับ path ให้ตรงกับ library.db ที่อยู่ backend/
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

module.exports = db;
