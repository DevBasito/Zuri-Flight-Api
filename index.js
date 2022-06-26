const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight.json");
const routes = require("./routes/flightRoute");
const uuid = require("uuid").v4();
const fs = require('fs');

const app = express();

app.use(json());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// app.use("/", routes);

const port = process.env.PORT || 3000;

// Add/Book Flight
app.post('/flight', (req, res) => {
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


})
// models.push({
//   id: uuid,
//   title: "flight to canada",
//   time: "1pm",
//   price: 26000,
//   date: "26-06-2022"
//   });
// console.log(models)

// Get all Flight
app.get('/flight', (req, res) => {
  return res.json({ models })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
