const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    // Validate input
    if (!event.showName || event.showName.trim() === '') {
        return {
            statusCode: 400,
            body: JSON.stringify({ Error: "Please enter a show name to search." })
        };
    }

    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });

    let searchShow = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT Seats4u.Show.showName, Seats4u.Venue.venueName, Seats4u.Venue.Location, Seats4u.Show.active, Seats4u.Show.date, Seats4u.Show.time, Seats4u.Show.price FROM Seats4u.Show JOIN Seats4u.Venue ON Seats4u.Show.venueName = Seats4u.Venue.venueName WHERE Seats4u.Show.showName LIKE ? AND active=1", ['%' + event.showName + '%'], (error, rows) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }
                return resolve(rows);
            });
        });
    }

    try {
        const all_constants = await searchShow();

        return {
            statusCode: 200,
            constants: all_constants
        };
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }
};
