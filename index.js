const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");

const flight = require("./routes/flightRoute");


const app = express();

app.use(json());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/flight", flight);

const port = process.env.PORT || 3000;

// Add/Book Flight


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
