import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/income/IncomeOverview"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { useUserAuth } from "../../hooks/useUserAuth"
import Modal from "../../components/modals/Modal"
import AddIncomeForm from "../../components/modals/AddIncomeForm"
import IncomeList from "../../components/income/IncomeList"
import DeleteAlert from "../../components/modals/DeleteAlert"

import toast from "react-hot-toast"

const Income = () => {

  useUserAuth()

  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get all Income entries
  const fetchIncomeDetalis = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncomeDetalis()

    return () => {}
  }, [])

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income

    // Validation checks
    if (!source.trim()) {
      toast.error("Source is required")
      return
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0 ) {
      toast.error("Amount should be a valid number greater than 0")
      return
    }

    if (!date) {
      toast.error("Date is required")
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added Successfully")
      fetchIncomeDetalis()

    } catch (error) {
      console.error("Error adding income", error.response?.message || error.message)
    }

  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null})
      toast.success("Income entry deleted successfully")
      fetchIncomeDetalis()
    } catch (error) {
      console.error("Error deleting income", error.response?.message || error.message)
    }
  }


  // Handle dewnload Income report
  const handleDownloadIncomeReport = async () => {

  }

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList 
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id})
            }}
            onDownload={handleDownloadIncomeReport}
          />
        </div>

        {/* Add Income Modal */}
        <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Income Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
        >
          <DeleteAlert 
            content="Are you sure you want to delete this income entry"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}
export default Income