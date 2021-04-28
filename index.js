const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const sellers = require('./Routes/Sellers');
const buyers = require('./Routes/Buyers');
const path = require('path');
require('dotenv/config');

app.use(express.json());
app.use(cors());
app.use('/sellers' , sellers);
app.use('/buyers', buyers);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// process.env.mongoUri
// mongodb://localhost/Appointment_Booking
mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify: false})
.then(()=>{console.log(`Connected to mongoDB`)})
.catch(()=>{console.log(`Connection Failed`)});

app.listen(port, () => {
    console.log(`Server is up and running on PORT ${port}`)
})