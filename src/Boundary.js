/** Draw the Venue */
export function drawVenue (venue, ctx) {    
    drawStage(ctx, venue.center[1].length, venue.sideLeft[1].length);

    drawSections(ctx, venue.sideLeft, 0);
    drawSections(ctx, venue.center, venue.sideLeft[0].length*30 + 50);
    drawSections(ctx, venue.sideRight, venue.sideLeft[0].length*30 + venue.center[0].length*30 +100);
}

/** Draw the sections (sideLeft, center, sideRight) */
export function drawSections(ctx, section, offset) {
    for (let r = 0; r < section.length; r++) {
        var y = r * 45 + 150;
        for (let c = 0; c < section[r].length; c++) {
            var x = c * 30 + 100 + offset;
            ctx.beginPath();
            ctx.strokeStyle = '#148F77';
            ctx.rect(x, y, 25, 25);
            ctx.fillStyle = '#48C9B0';
            ctx.fillRect(x, y, 25, 25);
            ctx.stroke();

            // Set the style for the text
            ctx.fillStyle = 'black'; // Choose a color for the text
            ctx.font = '12px Arial'; // Set the font size and family

            // Retrieve the ID for the seat
            let text = `${section[r][c].ID}`;
            let textWidth = ctx.measureText(text).width;
            let textX = x + (25 - textWidth) / 2; // Center the text in the box horizontally
            let textY = y + (25 / 2) + 6; // Center the text in the box vertically

            // Draw the text
            ctx.fillText(text, textX, textY);
        }
    }
}


/** Draw the stage based on the number of rows and offset */
export function drawStage(ctx, nc, left) {
    let stageSize = 100*(nc/5);
    let begin = nc*30/6 + 150 + left*30
    ctx.beginPath()
    ctx.strokeStyle = '#626567';
    ctx.rect(begin, 35, stageSize, 80);
    ctx.fillStyle = "#E5E7E9";
    ctx.fillRect(begin, 35, stageSize, 80);
    ctx.stroke()
}
/*
export function drawShow(ctx) {
    let image = document.getElementById('sold') // If we want to say the show is sold.
    ctx.drawImage(image, 3, 3, 100, 100);
    //drawBlock(ctx, maxr, maxc, offset);
}

export function drawBlock(ctx, maxr, maxc, offset) {
    for (let r = 0; r < maxr+1; r++) {
        var y = r*45 + 150
        for (let c = 0; c < maxc; c++) {
            var x = c*30 + 100 + offset
            ctx.beginPath()
            ctx.strokeStyle = '#148F77';
            ctx.rect(x, y, 25, 25)
            ctx.fillStyle = '#48C9B0 ';
            ctx.fillRect(x, y, 25, 25);
            ctx.stroke(); 
        }
    }
}
*/
/** Redraw entire canvas from model. */
export function redrawCanvas(venue, canvasObj, image) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);  
   
    if (venue) { 
        drawVenue(venue, ctx, image);
    }
}