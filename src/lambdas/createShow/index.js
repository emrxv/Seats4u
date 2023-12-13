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
  
  
  let validateManager = async () => {
        return new Promise((resolve, reject) => {
            if (!event.managerPassword) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No manager password provided." })
                });
            }
            
            pool.query("SELECT managerPassword FROM Venue WHERE managerPassword = ? AND venueName = ?", [event.managerPassword, event.venueName], (error, rows) => {
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
    
let validTime = async () => {
    return new Promise((resolve, reject) => {
        if (!event.date || !event.time) {
            return reject({
                statusCode: 400,
                body: JSON.stringify({ Error: "No date or time provided."})
            });
        }
        pool.query("SELECT time FROM `Show` WHERE date = ? AND time = ?", [event.date, event.time], (error, rows) => {
            if(error) { 
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ Error: "Database query failed."})
                });
            }
            if (rows.length > 0) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "Time not available."})
                });
            } else {
                return resolve(true);
            }
        });
    });
};
  
  let CreateShow = async () => {
      return new Promise((resolve, reject) => {
          pool.query("INSERT INTO `Show` (showName, venueName, active, proceedings, date, time, remainID, price) VALUES (?,?,?,?,?,?,?,?)", [event.showName, event.venueName, event.active, event.proceedings, event.date, event.time, event.remainID, event.price], (error, rows) => { 
              if (error) { return reject(error); }
              return resolve(rows);
          })
      })
  }

  try {
        await validateManager();
        
        await validTime();

        const show = await CreateShow();


        return {
            statusCode: 200,
            constants: show
        };
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }

};