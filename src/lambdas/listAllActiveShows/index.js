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

let ListActiveShows = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT showName FROM `Show` WHERE active=1;", (error, rows) => {
            if (error) {
                return reject(error);
            }
            if (rows.length === 0) {
                return reject({
                    statusCode: 400,
                    body: JSON.stringify({ Error: "No active shows." })
                });
            }
            return resolve(rows);
        });
    });
}

  try {

        const shows = await ListActiveShows();
        let names = shows.map(v => v.showName);

        return {
            statusCode: 200,
            body: JSON.stringify({ shows: names })
        };
  
    } catch (errorResponse) {
        return {
            statusCode: errorResponse.statusCode || 500,
            body: errorResponse.body || JSON.stringify({ Error: "An error occurred." })
        };
    }
    
};