const express = require('express');
const morgan = require('morgan');
const app = express();
const router = express.Router();
const authRouter = require('./routes/authRoutes')
const expenceCategoryRoute = require('./routes/expenseCategoryRoutes')
const expenseController = require('./routes/expenseRoutes')
const cors = require('cors')
// const servicesRouter = require('./routes/servicesRoute')
// const foremanRouter = require('./routes/foremanRoute')
app.use(express.json())
app.use(cors())

app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', expenceCategoryRoute);
app.use('/api/v1/expenses', expenseController)
// app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/foreman', foremanRouter);


module.exports = app;