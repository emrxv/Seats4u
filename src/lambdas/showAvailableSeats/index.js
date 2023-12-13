const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    
     let checkActiveShow = () => {
        return new Promise((resolve, reject) => {
            if (!event.showName) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No show name provided." })
                });
            }

            let query = "SELECT active FROM Seats4u.Show WHERE showName = ?";
            pool.query(query, [event.showName], (error, results) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }
                if (results.length === 0 || results[0].active === 0) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "Inactive show or show not found." })
                    });
                }
                resolve();
            });
        });
    };
    
        let Dimentions = () => {
        return new Promise((resolve, reject) => {
            if (!event.showName) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No show name provided." })
                });
            }

            // Adjusted query to join Seats4u.Venue, Seats4u.Show, and Seats4u.showSeatsRemaining
            let query = `SELECT
    Seats4u.Venue.venueName,
    Seats4u.Show.showName,
    Seats4u.Venue.endRowColL,
    Seats4u.Venue.endRowColR,
    Seats4u.Venue.endRowColC
FROM
    Seats4u.Venue
JOIN
    Seats4u.Show ON Seats4u.Venue.venueName = Seats4u.Show.venueName
LEFT JOIN
    Seats4u.showSeatsRemaining ON Seats4u.Show.showName = Seats4u.showSeatsRemaining.showName
WHERE
    Seats4u.Show.showName = ?
GROUP BY
    Seats4u.Venue.venueName,
    Seats4u.Show.showName,
    Seats4u.Venue.endRowColL,
    Seats4u.Venue.endRowColR,
    Seats4u.Venue.endRowColC

`;
            pool.query(query, [event.showName], (error, rows) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }

                if (rows.length === 0) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "No available seats or inactive show." })
                    });
                }

                return resolve(rows);
            });
        });
    }
    

    let showAvailableSeats = () => {
        return new Promise((resolve, reject) => {
            if (!event.showName) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No show name provided." })
                });
            }

            // Adjusted query to join Seats4u.Venue, Seats4u.Show, and Seats4u.showSeatsRemaining
            let query = `SELECT
    Seats4u.showSeatsRemaining.row, 
    Seats4u.showSeatsRemaining.column, 
    Seats4u.showSeatsRemaining.layoutSide
FROM
    Seats4u.Venue
JOIN
    Seats4u.Show ON Seats4u.Venue.venueName = Seats4u.Show.venueName
LEFT JOIN
    Seats4u.showSeatsRemaining ON Seats4u.Show.showName = Seats4u.showSeatsRemaining.showName
WHERE
    Show.showName = ?
GROUP BY
    Seats4u.showSeatsRemaining.row,
    Seats4u.showSeatsRemaining.column,
    Seats4u.showSeatsRemaining.layoutSide
`;
            pool.query(query, [event.showName], (error, rows) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }

                if (rows.length === 0) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "No available seats or inactive show." })
                    });
                }
                if(rows[0].row === null || rows[0].column === null || rows[0].layoutSide === null) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "Show is sold out."})
                    })
                }

                return resolve(rows);
            });
        });
    }
    
    

    try {
        await checkActiveShow();
        const dimentions = await Dimentions();
        const all_constants = await showAvailableSeats();

        return {
            statusCode: 200,
            Dimentions: dimentions,
            AvailableSeats: all_constants
        };
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }
};
