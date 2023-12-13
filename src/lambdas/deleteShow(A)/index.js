const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')


exports.handler = async (event) => {
    // get credentials from the db_access layer (loaded separately via AWS console)
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
  
  let DeleteShowA = () => {
      return new Promise((resolve, reject) => {
          if (!event.showName) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No show name provided." })
                });
            }
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
        await validateAdmin();
        
        await DeleteSeats_rem();
        await DeleteSeats_sold();

        const all_constants = await DeleteShowA()
  
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