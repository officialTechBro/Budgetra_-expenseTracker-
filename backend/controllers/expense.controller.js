import Expense from '../models/Expense.js'
import xlsx from 'xlsx'


export const addExpense = async (req, res) => {
    const userId = req.user.id
    try {
        const {icon, amount, category, date} = req.body
        if (!amount || !category || !date) {
            return res.status(400).json({message: "Missing required fields"})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date
        })

        await newExpense.save()
        res.status(201).json(newExpense)

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const getAllExpense = async (req, res) => {
    const userId = req.user.id
    try {
        const expense = await Expense.find({userId}).sort({date: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params
        await Expense.findByIdAndDelete(id)
        res.status(200).json({message: "expense deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({userId}).sort({date: -1})

        // Excel sheet data
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "expense")
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')

    } catch (error) {
        res.status(500).json({message: "Error downloading report", error: error.message})
    }
}


