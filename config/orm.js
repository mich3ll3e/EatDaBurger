const connection = require('./connection');

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `"${value}'`;
            }

            arr.push(`${key} = ${value}`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

const orm = {
    select: (tableInput, cb) => {
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    create: (table, cols, vals, cb) => {
        var queryString = `INSERT INTO ${table} (${cols.toString()}) `;
        queryString += `VALUES (${printQuestionMarks(vals.length)});`;

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    update: (table, objColVals, condition, cb) => {
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }, 

    delete: (table, condition, cb) => {
        const queryString = `DELETE FROM ${table} WHERE ${condition};`;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;