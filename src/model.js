export class Seat {
    constructor(ID, row, column, layoutSide, sold) {
        this.ID = ID
        this.row = row
        this.column = column
        this.layoutSide = layoutSide
        this.sold = sold
    }
}

export class Block {
    constructor(blockID, price, seats) {
        this.blockID = blockID
        this.price = price
        this.seats = [];//seats make array

    }
}

export class Show {
    /**
    constructor(name, proceeds, date, time, isActive, blocks, seatsAvailable, seatsRemaining) {
    this.name = name
    this.isActive = isActive
    this.proceeds = proceeds
    this.date = date
    this.time = time
    this.blocks = blocks
    let totalSeats = seatsAvailable + seatsRemaining;
    this.totalSeats = totalSeats
    }
    */
    constructor(config) {
        this.initialize(config)
    }
    initialize(config) {

    }
}

export class Venue {
    /** 
    constructor(name, venueShows, location, sideLeft, center, sideRight, managerPass, adminPass) {
        this.name = name
        this.venueShows = []; //venueShows make array
        this.location = location
        this.sideLeft = sideLeft
        this.center = center
        this.sideRight = sideRight
        this.managerPass = managerPass
        this.adminPass = adminPass

        this.Venue = Array.from(Array(33), () => new Array(33));  
    }
    */
    constructor(config) {
        this.initialize(config)
    }
    initialize(config) {
        let ID = 0;
    
        for (let l = 0; l < 3; l++) {
            let nr, nc;
    
            if (l === 0) { // sideLeft
                nr = config.endRowColL.split("", 2)[0].charCodeAt(0) - 65;
                nc = parseInt(config.endRowColL.split("", 2)[1]);
                this.sideLeft = Array.from(Array(nr), () => new Array(nc));
            } else if (l === 1) { // center
                nr = config.endRowColC.split("", 2)[0].charCodeAt(0) - 65;
                nc = parseInt(config.endRowColC.split("", 2)[1]);
                this.center = Array.from(Array(nr), () => new Array(nc));
            } else if (l === 2) { // sideRight
                nr = config.endRowColR.split("", 2)[0].charCodeAt(0) - 65;
                nc = parseInt(config.endRowColR.split("", 2)[1]);
                this.sideRight = Array.from(Array(nr), () => new Array(nc));
            }
    
            for (let r = 0; r < nr; r++) {
                for (let c = 0; c < nc; c++) {
                    if (l === 0) {
                        this.sideLeft[r][c] = new Seat(ID, String.fromCharCode(r + 65), c+1, "sideLeft", 0);
                    } else if (l === 1) {
                        this.center[r][c] = new Seat(ID, String.fromCharCode(r + 65), c+1, "center", 0);
                    } else if (l === 2) {
                        this.sideRight[r][c] = new Seat(ID, String.fromCharCode(r + 65), c+1, "sideRight", 0);
                    }
                    ID++;
                }
            }
        }
    }
}