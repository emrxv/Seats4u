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
       // this.seats = seats make array

    }
}

export class Show {
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
}

export class Venue {
    constructor(name, venueShows, location, sideLeft, center, sideRight, managerPass, adminPass) {
        this.name = name
       // this.venueShows = venueShows make array
        this.location = location
        this.sideLeft = sideLeft
        this.center = center
        this.sideRight = sideRight
        this.managerPass = managerPass
        this.adminPass = adminPass

        this.Venue = Array.from(Array(33), () => new Array(33));
        let ID = 0;
        for (let r = 0; r < 33; r++) {
            for (let c = 0; c < 33; c++) {
                this.Venue[r][c] = new Seat(ID, )
                ID++;
            }
        }
    }
}