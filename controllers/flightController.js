const models = require("../models/Flight.json");
const uuid = require("uuid").v4();
const fs = require('fs');

// Add/Book Flight
exports.addFlights = (req, res) => {
    req.body.id = uuid;
    models.push(req.body);
    console.log({ models });
    let stringedData = JSON.stringify(models, null, 2);

    //rewrites the flight.json file and append the newuser added to it
    fs.writeFile('./models/Flight.json', stringedData, (err) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
    })

    return res.status(200).json({
        message: "Flight Booked successfully",
        All_flights: models
    });


}
// models.push({
//   id: uuid,
//   title: "flight to canada",
//   time: "1pm",
//   price: 26000,
//   date: "26-06-2022"
//   });
// console.log(models)


// Get all Flight
exports.getFlights = (req, res) => {
    try {
        
        res.status(200).json({ models });
    } catch (error) {
        res.status(500).json({ message: err })
    }
}


// Get a Single Flight with Id
exports.findFlight = (req, res) => {
    let id = req.params.id;
    let FindFlight = models.find((flight) => {
        return String(flight.id) === id;
    })
    console.log(FindFlight);
    if (FindFlight) {
        return res.status(200).json({ Flight: FindFlight })
    } else {
        return res.status(500).json({ message: "Flight not Found or Doesn't Exist" })
    }
};


//Update a Flight
exports.updateFlights = (req, res) => {
    let id = req.params.id;
    let FindFlight = models.find((flight) => {
        return String(flight.id) === id;
    })
    console.log(FindFlight);
    if (FindFlight) {
        const { title, time, price, date } = req.body

        if (title) {
            FindFlight.title = title;
        }
        if (time) {
            FindFlight.time = time;
        }
        if (price) {
            FindFlight.price = price;
        }
        if (date) {
            FindFlight.date = date;
        }


        let stringedData = JSON.stringify(models, null, 2);

        fs.writeFile('./models/Flight.json', stringedData, (err) => {
            if (err) {
                return res.status(500).json({ message: err })
            } else {
                return res.status(200).json({
                    message: "Flight Updated successfully",
                    All_flights: models
                });
            }
        })




    } else {
        return res.status(500).json({ message: "Flight not Found or Doesn't Exist" })
    }
};



// Delete Flight
exports.deleteFlight = (req, res) => {
    let id = req.params.id;
    let FindFlight = models.find((flight) => {
        return String(flight.id) === id;
    })
    console.log(FindFlight);

    if (FindFlight) {
        models.splice(models.indexOf(FindFlight), 1);
        let stringedData = JSON.stringify(models, null, 2);

        fs.writeFile('./models/Flight.json', stringedData, (err) => {
            if (err) {
                return res.status(500).json({ message: err })
            } else {
                return res.status(200).json({
                    message: "Flight Deleted successfully",
                    All_flights: models
                });
            }
        })




    } else {
        return res.status(500).json({ message: "Flight not Found or Doesn't Exist" })
    }
}




