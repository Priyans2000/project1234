const express = require("express");
const app= express();
const mongoose= require("mongoose");
const cors= require("cors");
const bodyparser = require('body-parser')
const adminRoute= require("./routes/adminRoute");
const productRoute= require("./routes/productRoute");
const paymentRoute = require("./routes/payment");
const userRoute= require("./routes/usersRoutes");
require("dotenv").config();
const PORT=process.env.PORT || 8000

app.use(cors({
  origin: "https://project123-pearl-chi.vercel.app",
  credentials: true
}));
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.use("/adminuser", adminRoute);
app.use("/product", productRoute);
app.use("/users", userRoute);

app.use("/api/payment/",paymentRoute);


// Ensure the MongoDB URI is provided (fail fast in production)
const dbUri = process.env.DBCON;
if (!dbUri) {
  console.error('FATAL: environment variable DBCON is not set.');
  console.error('Set DBCON to your MongoDB connection string in your host environment.');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => {
    console.log('DB Connected!!!');
  })
  .catch((err) => {
    console.error('FATAL: Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  });


app.listen(PORT, ()=>{
    console.log(`server run on ${PORT}`)
});