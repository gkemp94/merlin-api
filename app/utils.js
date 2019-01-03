const { db } = require("./db");

const findAll = sqlRequest => {
    return new Promise((resolve, reject) => {
        db.all(sqlRequest, (err, rows) => {
            console.log(rows[1])
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const find = (sqlRequest, sqlParams) => {
    return new Promise((resolve, reject) => {
        db.get(sqlRequest, sqlParams, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const run = (sqlRequest, sqlParams) => {
    return new Promise((resolve, reject) => {
        let stmt = db.prepare(sqlRequest);
        stmt.run(sqlParams, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = { findAll, run, find };
