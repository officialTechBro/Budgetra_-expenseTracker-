import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }
        const userObjectId = new Types.ObjectId(String(userId))

        const now = Date.now();
        const sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

        // Run queries in parallel for better performance
        const [
            totalIncomeAgg,
            totalExpenseAgg,
            last60DaysIncome,
            last30DaysExpense,
            latestIncomes,
            latestExpenses
        ] = await Promise.all([
            Income.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            Expense.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            Income.find({ userId, date: { $gte: sixtyDaysAgo } }).sort({ date: -1 }),
            Expense.find({ userId, date: { $gte: thirtyDaysAgo } }).sort({ date: -1 }),
            Income.find({ userId }).sort({ date: -1 }).limit(5),
            Expense.find({ userId }).sort({ date: -1 }).limit(5)
        ]);

        // Calculating sums
        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpense = totalExpenseAgg[0]?.total || 0;

        const totalIncomeLast60Days = last60DaysIncome.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );
        const totalExpenseLast30Days = last30DaysExpense.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Combine and sort recent transactions
        const recentTransactions = [
            ...latestIncomes.map(txn => ({ ...txn.toObject(), type: "income" })),
            ...latestExpenses.map(txn => ({ ...txn.toObject(), type: "expense" }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        // Final response
        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            last30DaysExpense: {
                total: totalExpenseLast30Days,
                transactions: last30DaysExpense
            },
            last60DaysIncome: {
                total: totalIncomeLast60Days,
                transactions: last60DaysIncome
            },
            recentTransactions
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
