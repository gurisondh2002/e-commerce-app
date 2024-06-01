const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')
const productRouter = require("./routes/ProductRoute");
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const cartRouter = require("./routes/cart")
const favRouter = require("./routes/favourites")
const orderRouter = require("./routes/order")
const addressRouter = require("./routes/address")
const port = 3020;


app.use(cors())

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("DB CONNECTED");
}).catch((err) =>{
    console.log(err);
})

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}));

app.use('/api/products', productRouter);
app.use('/api',authRouter);
app.use('/api/users',userRouter);
app.use('/api/carts',cartRouter);
app.use('/api/favourites',favRouter);
app.use('/api',addressRouter);
app.use('/api/orders',orderRouter);

app.listen(process.env.PORT || port , () =>{
    console.log(`Server is listening on port ${port}`);
})