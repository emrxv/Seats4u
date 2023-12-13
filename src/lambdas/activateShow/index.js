const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access');

exports.handler = async (event) => {
  var pool = mysql.createPool({
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });
  
let activateShow = async () => {
  return new Promise((resolve, reject) => {
    // Check if there are blocks for the given show
    pool.query("SELECT COUNT(*) AS blockCount FROM Seats4u.Block WHERE showName = ?", [event.showName], (error, blockResults) => {
      if (error) {
        return reject(error);
      }

      const { blockCount } = blockResults[0];
      // If there are no blocks, proceed to activate the show
      if (blockCount === 0) {
        // Update the active status to 1 for the given showName where it is currently 0
        pool.query("UPDATE Seats4u.Show SET active = 1 WHERE showName = ? AND active = 0", [event.showName], (updateError, updateResults) => {
          if (updateError) {
            return reject(updateError);
          }
          // Check if any rows were changed
          if (updateResults.affectedRows > 0) {
            resolve(updateResults);
          } else {
            // If no rows were changed, it means the show was already active or doesn't exist
            return reject({
              statusCode: 400,
              body: JSON.stringify({ Error: "Show is already active or does not exist." })
            });
          }
        });
      } else {
        // Reject if there are blocks for the show
        return reject({
          statusCode: 400,
          body: JSON.stringify({ Error: "Cannot activate show: blocks exist." })
        });
      }
    });
  });
}



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
  try {
    await validateManager();
    const result = await activateShow();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Show activated successfully', result: result })
      };
    } catch (error) {
        // Handle the error by logging and returning an appropriate message
      return {
      statusCode: error.statusCode,
      body: error.body
    };
  }
};
