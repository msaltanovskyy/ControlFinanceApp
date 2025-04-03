const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const app = express(); // Create express app
const port = 5000; // Define port

// Import routes
//const itemRoutes = require('./routes/itemRoutes'); // Import item routes
//const userRoutes = require('./routes/userRoutes'); // Import user routes
//const profileRoutes = require('./routes/profileRoutes'); // Import profile routes

// Middleware
const dbUrl = 'mongodb://localhost:27017/fin_app'; // MongoDB connection URL

// Middleware JSON
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello world!!!");
});

// create server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// connecpt to db
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connect complete');
})
.catch(err => {
    console.error('Connect break:', err);
});
