const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const app = express(); // Create express app
const port = 5000; // Define port

// Import routes
//const itemRoutes = require('./routes/itemRoutes'); 
const userRoutes = require('./routes/userRoutes');
//const profileRoutes = require('./routes/profileRoutes'); 
//const transactionRoutes = require('./routes/transactionRoutes'); 

app.use('/api/users', userRoutes); 
//app.use('/api/items', itemRoutes); 
//app.use('/api/profiles', profileRoutes); 
//app.use('/api/transactions', transactionRoutes); 

// Middleware
const dbUrl = 'mongodb://localhost:27017/fin_app'; // MongoDB connection URL

// Middleware JSON
app.use(express.json());


// create server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// connecpt to db
mongoose.connect(dbUrl)
.then(() => {
    console.log('Connect complete');
})
.catch(err => {
    console.error('Connect break:', err);
});
