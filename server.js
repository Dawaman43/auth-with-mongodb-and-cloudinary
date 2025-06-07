require('dotenv').config()
const express = require('express');
const connectToDb = require('./database/db')
const authRoutes = require('./routes/auth-router')
const homeRoutes = require('./routes/home-router')
const adminRoutes = require('./routes/admin-router')
const imageRoutes = require('./routes/image-router')
connectToDb();

const port = process.env.PORT||3000;
const app = express();

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/image', imageRoutes)
app.listen(port, ()=>console.log(`Server is listening on port ${port}`))