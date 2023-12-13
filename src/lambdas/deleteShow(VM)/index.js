const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
const pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
});

  
       let checkActiveShow = async () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT COUNT(*) AS activeShow FROM Seats4u.Show WHERE showName = ? AND active = 1", [event.showName], (error, results) => {
                if (error) {
                    return reject({
                        statusCode: 500,
                        body: JSON.stringify({ message: error.message })
                    });
                }
                if (results[0].activeShow > 0) {
                    return reject({
                        statusCode: 400,
                        body: JSON.stringify({ Error: "Show is active and cannot be deleted." })
                    });
                }
                resolve();
            });
        });
    };
  
    let validateManager = async () => {
        return new Promise((resolve, reject) => {
            if (!event.managerPassword) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No manager password provided." })
                });
            }
            
        pool.query("SELECT Seats4u.Venue.managerPassword FROM Seats4u.Show JOIN Seats4u.Venue ON Seats4u.Show.venueName = Seats4u.Venue.venueName WHERE Seats4u.Show.showName = ? AND Seats4u.Venue.managerPassword = ?", [event.showName, event.managerPassword], (error, rows) => {
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
                        body: JSON.stringify({ Error: "Incorrect manager password." })
                    });
                }
            });
        });
    };
  
  let DeleteShow = async () => {
      return new Promise((resolve, reject) => {
          pool.query("DELETE FROM `Show` WHERE showName=?;", [event.showName], (error, rows) => { 
              if (error) { return reject(error); }
              return resolve(rows);
          })
      })
  }
  
  let DeleteSeats_rem = async () => {
      return new Promise((resolve, reject) => {
          pool.query("DELETE FROM Seats4u.showSeatsRemaining WHERE Seats4u.showSeatsRemaining.showName=?;", [event.showName], (error, rows) => { 
              if (error) { return reject(error); }
              return resolve(true);
          })
      })
  }
  
  let DeleteSeats_sold = async () => {
      return new Promise((resolve, reject) => {
          pool.query("DELETE FROM Seats4u.soldSeats WHERE Seats4u.soldSeats.showName=?;", [event.showName], (error, rows) => { 
              if (error) { return reject(error); }
              return resolve(true);
          })
      })
  }
  
  try {
        await validateManager();
       await checkActiveShow();
       await DeleteSeats_rem();
       await DeleteSeats_sold();

        const all_constants = await DeleteShow()
  
        const response = {
          statusCode: 200,
          constants: all_constants
        }
  return response;
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }
    
};