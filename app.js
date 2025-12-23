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


mongoose.connect(process.env.DBCON).then(()=>{
    console.log("DB Connected!!!");
})


app.listen(PORT, ()=>{
    console.log(`server run on ${PORT}`)
});