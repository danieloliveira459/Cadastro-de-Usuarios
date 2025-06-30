const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL, 
            date TEXT NOT NULL, 
            email TEXT NOT NULL UNIQUE
        )
    `);
});

module.exports = db;