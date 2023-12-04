export const venueConfig = {
    "endRowColL" : "A4",
    "endRowColC" : "D9",
    "endRowColR" : "D5"
}



/*
const express = require('express');
const fs = require('fs');
const path = require('path');



const app = express();
app.use(express.json());

app.post('/updateVenueConfig', (req, res) => {
    const configData = req.body;
    const configPath = path.join(__dirname, 'seatsConfig.js');

    const venueConfig = {
        "endRowColL" : JSON.stringify(configData, null, 0),
        "endRowColC" : JSON.stringify(configData, null, 1),
        "endRowColR" : JSON.stringify(configData, null, 2)
    }
    

    fs.writeFile(configPath, fileContent, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating configuration.');
        }
        res.send('Configuration updated successfully.');
    });
 
});

// ... rest of your server setup ...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/*
export const venueConfig = {
    "endRowColL" : "",
    "endRowColC" : "",
    "endRowColR" : ""
}
*/