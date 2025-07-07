import { Router } from "express";
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from "../controllers/income.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const incomeRoutes = Router()

incomeRoutes.post('/add', protect, addIncome)
incomeRoutes.get('/get', protect, getAllIncome)
incomeRoutes.get('/downloadexcel', protect, downloadIncomeExcel)
incomeRoutes.delete('/:id', protect, deleteIncome)

export default incomeRoutes