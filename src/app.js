const express = require('express'); // Import express
const app = express(); // Create express app
const {errorHandler} = require('./middleware/errorMiddleware'); // Import error handler middleware
const connectDB = require('./config/db'); // Import database connection
require('dotenv').config(); // Подключение dotenv


// Import routes
//const itemRoutes = require('./routes/itemRoutes'); 
const userRoutes = require('./routes/userRoutes');
//const profileRoutes = require('./routes/profileRoutes'); 
//const transactionRoutes = require('./routes/transactionRoutes'); 

//app.use('/api/items', itemRoutes); 
//app.use('/api/profiles', profileRoutes); 
//app.use('/api/transactions', transactionRoutes); 
app.use('/api/users', userRoutes); // Use user routes

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(errorHandler); // Use error handler middleware


// create server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

connectDB(); // Connect to database
