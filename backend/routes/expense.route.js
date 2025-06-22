import { Router } from "express";
import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} from "../controllers/expense.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const expenseRoutes = Router()

expenseRoutes.post('/add', protect, addExpense)
expenseRoutes.get('/get', protect, getAllExpense)
expenseRoutes.post('/downloadexcel', protect, downloadExpenseExcel)
expenseRoutes.delete('/:id', protect, deleteExpense)

export default expenseRoutes