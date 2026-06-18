const express = require('express')
const cors = require('cors')
const enquiryRoutes = require('./routes/enquiryRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// CORS — sirf allowed origins se requests accept karo
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',')
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
}))

app.use(express.json())

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Routes
app.use('/api/enquiry', enquiryRoutes)

// Error handler
app.use(errorHandler)

module.exports = app
