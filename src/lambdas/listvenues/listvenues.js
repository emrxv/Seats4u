const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let validateAdmin = () => {
        return new Promise((resolve, reject) => {
            if (!event.adminPassword) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No admin password provided." })
                });
            }
            
            pool.query("SELECT adminPassword FROM Admin WHERE adminPassword = ?", [event.adminPassword], (error, rows) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }
                if (rows.length === 1) {
                    return resolve(true);
                } else {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "Incorrect admin password." })
                    });
                }
            });
        });
    };

    let listVenues = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT venueName FROM Venue", [], (error, rows) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }
                return resolve(rows);  
            });
        });
    };

    try {
        await validateAdmin();

        const venues = await listVenues();
        let names = venues.map(v => v.venueName);

        return {
            statusCode: 200,
            body: JSON.stringify({ venues: names })
        };
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }
};
