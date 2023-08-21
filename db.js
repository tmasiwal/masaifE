const mongoose = require('mongoose');
require('dotenv').config();
const connectionn =mongoose.connect(process.env.mongooseURl)


module.exports={connectionn}