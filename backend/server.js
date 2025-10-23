import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.route.js'
import incomeRoutes from './routes/income.route.js'
import expenseRoutes from './routes/expense.route.js'
import dashboardRoutes from './routes/dashboard.route.js'
import path from 'path'
import { fileURLToPath } from 'url';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

connectDB()


app.get("/", (req, res) => {
    res.status(200).json({status : "OK"})
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)


// Serve upload folder
app.use('/uploads', express.static(path.join(__dirname, "uploads")))


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server connected to port: ${PORT}`)
})