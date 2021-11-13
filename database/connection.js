require('dotenv').config() ; 
const mongoose = require("mongoose");

var connection ; 

async function connectDB() {
  
    connection = mongoose.connect(
    process.env.MONGO_CONNECTION_URL2,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const connect = mongoose.connection;



  
  //return promises
  
  try{
  await connect.once("open", () => {
      console.log("database connected");
    })
  }
  catch(err) {
    console.log(err)
  }
  
    
    
}

module.exports = {connectDB , connection};