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
  
  let ListConstants = () => {
      return new Promise((resolve, reject) => {
          pool.query("INSERT INTO Venue (venueName, venueShows, location, managerPassword, adminPassword, layoutName) VALUES (?,?,?,?,?,?)", [event.venueName, event.venueShows, event.location, event.managerPassword, event.adminPassword, event.layoutName], (error, rows) => { 
              if (error) { return reject(error); }
              return resolve(rows);
          })
      })
  }
  
  const all_constants = await ListConstants()
  
  const response = {
    statusCode: 200,
    constants: all_constants
  }
  return response;
};