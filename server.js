const express = require('express');
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig")
const portfolioRoute = require("./routes/portfolioRoute")
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is Up on Running at ${PORT}`);
})