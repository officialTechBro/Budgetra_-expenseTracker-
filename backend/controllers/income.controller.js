import Income from "../models/Income.js"
import xlsx from 'xlsx'


export const addIncome = async (req, res) => {
    const userId = req.user.id
    try {
        const {icon, amount, source, date} = req.body
        if (!amount || !source || !date) {
            return res.status(400).json({message: "Missing required fields"})
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        })

        await newIncome.save()
        res.status(201).json(newIncome)

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const getAllIncome = async (req, res) => {
    const userId = req.user.id
    try {
        const income = await Income.find({userId}).sort({date: -1})
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const deleteIncome = async (req, res) => {
    try {
        const {id} = req.params
        await Income.findByIdAndDelete(id)
        res.status(200).json({message: "Income deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({userId}).sort({date: -1})

        // Excel sheet data
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb, 'income_details.xlsx')
        res.download('income_details.xlsx')

    } catch (error) {
        res.status(500).json({message: "Error downloading report", error: error.message})
    }
}


