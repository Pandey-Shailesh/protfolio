const mongoose =require('mongoose')
mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;
connection.on('error',()=>{
    console.log("Error connecting to database");
});
connection.on('connected',()=>{
    console.log("Connected to MongoDB database");
});
module.exports =connection;