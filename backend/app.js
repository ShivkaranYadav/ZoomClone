const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8000;
const { connectDb } = require('./db/userDb');


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

connectDb();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});