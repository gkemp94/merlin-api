const { Database } = require('sqlite3');

const db = new Database('merlin.db');

const init = () => {
    db.run(`CREATE TABLE if not exists entries(
        "date" REAL PRIMARY KEY,
        "city" TEXT,
        "state" TEXT,
        "country" TEXT,
        "confirmed" BOOLEAN,
        "source" TEXT
    );`);

    db.run(`CREATE TABLE if not exists locations(
        "id" INTEGER,
        "city" TEXT,
        "state" TEXT,
        "country" TEXT,
        "flag_url" TEXT,
        "latitude"  REAL,
        "longitude" REAL
    );`)
};

module.exports = {
    init, 
    db,
}
