const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/ProductRoute");
const port = 3000;

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("DB CONNECTED");
}).catch((err) =>{
    console.log(err);
})

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}));

app.use('/api/products', productRouter);

app.listen(process.env.PORT || port , () =>{
    console.log(`Server is listening on port ${port}`);
})