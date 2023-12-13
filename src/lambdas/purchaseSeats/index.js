const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
    var pool = mysql.createPool({
        host: db_access.config.host,
        user: db_access.config.user,
        password: db_access.config.password,
        database: db_access.config.database
    });
    
    let checkBlock = (event) => {
        //select showname from block table, if more than 1 row is affected then there is a block and we want to purchase for block price
         return new Promise((resolve, reject) => {
            let query = "SELECT * FROM Seats4u.Block WHERE showName = ?";
            pool.query(query, [event.showName], (error, results) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ Error: "Database query failed." })
                    });
                }
                if (results.length === 0) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "No Blocks Used." })
                    });
                }
                resolve();
            });
        });
    };

    
      let checkActiveShow = (event) => {
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
    
// removes the seat from showSeatsRemaining table
    let deleteSeat = async (event) => {
        return new Promise((resolve, reject) => {
            pool.query(
              "DELETE Seats4u.showSeatsRemaining FROM Seats4u.showSeatsRemaining JOIN Seats4u.Show ON Seats4u.showSeatsRemaining.showName = Seats4u.Show.showName WHERE Seats4u.showSeatsRemaining.showName=? AND Seats4u.showSeatsRemaining.`row`=? AND Seats4u.showSeatsRemaining.`column`=? AND Seats4u.showSeatsRemaining.layoutSide=?",
                [event.showName, event.row, event.column, event.layoutSide],
               (error, result) => {
                    if (error) {
                        console.error("Error deleting seat:", error);
                        return reject({
                            statusCode: 400,
                            body: JSON.stringify({ Error: "Seat not found."})
                        });
                    }
                    if ((result.affectedRows === 0)) {
                        return reject({
                            statusCode: 400,
                            body: JSON.stringify({ Error: "Seat not found or already purchased." + event.row + event.column + event.layoutSide})
                        });
                        
                    } else {
                        return resolve({
                            statusCode: 200,
                            body: JSON.stringify({ message: 'Seat purchased.'})
                        });
                    }
                }
            );
        });
    };
    // adds the seat to the soldSeats table after it has been deleted
    let soldSeats = async (event) => {

        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO Seats4u.soldSeats (showName, `row`, `column`, layoutSide) VALUES (?, ?, ?, ?)", [event.showName, event.row, event.column, event.layoutSide], (error, result) => {
                    if (error) {
                        console.error("Error marking seat in sold seats:", error);
                        return reject({
                            statusCode: 400,
                            body: JSON.stringify({ Error: "Invalid seat values."})
                        });
                    } else {
                        return resolve({
                            statusCode: 200,
                            body: JSON.stringify({ message: 'Seat has been sold.'})
                        });
                    }
                }
            );
        });
    };
    // updates the proceeds in the corresponding show
    let proceedsUpdate = async (event) => {
        
        return new Promise((resolve, reject) => {
            pool.query("UPDATE `Show` SET proceedings = proceedings + price WHERE showName = ?", [event.showName], (error, result) => {
                    if (error) {
                        console.error("Error updating proceeds:", error);
                        return reject({
                            statusCode: 400,
                            body: JSON.stringify({ Error: "Cannot update proceedings." })
                        });
                    } else {
                        return resolve({
                            statusCode: 200,
                            body: JSON.stringify({ message: 'Updated proceeds successfully.', result: result })
                        });
                    }
                }
            );
        });
    };
    
try {
        for (const seat of event.seats) {
            await checkActiveShow(seat);
            await deleteSeat(seat);
            await soldSeats(seat);
            await proceedsUpdate(seat);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify("Congrats on buying a seat(s). Seat is no longer available for purchase.")
        };
        return response;
    } catch (errorResponse) {
        return {
            statusCode: 500,
            body: errorResponse.body
        };
    }
};
