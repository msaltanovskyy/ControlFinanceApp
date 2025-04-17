const express = require('express'); // Import express
const app = express(); // Create express app
const {errorHandler} = require('./middleware/errorMiddleware'); // Import error handler middleware
const connectDB = require('./config/db'); // Import database connection
const dotenv = require('dotenv');

// Import routes
//const itemRoutes = require('./routes/itemRoutes'); 
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
//const transactionRoutes = require('./routes/transactionRoutes'); 
app.use(express.json()); // Parse JSON data 
app.use('/api/profiles', profileRoutes); // Use profile routes
app.use('/api/users', userRoutes); // Use user routes
//app.use('/api/transactions', transactionRoutes);
//app.use('/api/items', itemRoutes); // Use item routes 

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(errorHandler); // Use error handler middleware

dotenv.config(); // Load environment variables from .env file
// create server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});

connectDB(); // Connect to database
