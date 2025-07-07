import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useState, useEffect } from "react"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import toast from "react-hot-toast"
import ExpenseOverview from "../../components/expense/ExpenseOverview"
import Modal from "../../components/modals/Modal"
import AddExpenseForm from "../../components/modals/AddExpenseForm"
import ExpenseList from "../../components/expense/ExpenseList"
import DeleteAlert from "../../components/modals/DeleteAlert"

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  // Get all Expense entries
  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
      if (response.data && Array.isArray(response.data)) {
        setExpenseData(response.data)
      } else {
        setExpenseData([])
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
  }, [])

  // Add Expenses
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense

    if (!category.trim()) {
      toast.error("Category is required")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0")
      return
    }
    if (!date) {
      toast.error("Date is required")
      return
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon })
      setOpenAddExpenseModal(false)
      toast.success("Expense added Successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error adding expense", error.response?.message || error.message)
    }
  }

  // Delete Expenses
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense entry deleted successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error deleting expense", error.response?.message || error.message)
    }
  }

  // Download Expense Report
  const handleDownloadExpenseReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      })

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Expense_Report.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error("Error downloading report", error.response?.message || error.message)
      toast.error("Failed to download report")
    }
  }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          {loading ? (
            <p className="text-gray-500 text-center">Loading expenses...</p>
          ) : (
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadExpenseReport}
            />
          )}
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Expense Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense entry?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
