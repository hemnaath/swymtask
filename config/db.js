// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection ({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
// });

// connection.connect((err)=>{
//     if(err){
//         console.log('Err connecting database');
//         return;
//     }
//     console.log('Database connected');
// })

// module.exports = connection;
const mongoose = require('mongoose');
require('dotenv').config()

 
mongoose.connect(process.env.DB_CONNECT);
console.log("Database Connected");


module.exports = mongoose;