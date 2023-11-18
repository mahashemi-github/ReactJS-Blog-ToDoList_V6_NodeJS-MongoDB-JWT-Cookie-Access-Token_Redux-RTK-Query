import express from 'express'
import mongoose from'mongoose'
import cookieParser from 'cookie-parser'
import allRoutes from './routes/allRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// middlewares
app.use(express.json()) // it allows us to parse raw json
app.use(express.urlencoded({ extended: true })) // it allows us to send formdata as well
app.use(cookieParser())

const PORT = process.env.PORT
const dbURI = process.env.DB_URI
mongoose.set('strictQuery', true)

mongoose.connect(dbURI)
.then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}...`)})
})
.catch(err => {
    console.log(err)
    process.exit(1)
})

// routes
// app.get('*', checkUser)
app.use('/api', allRoutes)

app.use(notFound);
app.use(errorHandler);