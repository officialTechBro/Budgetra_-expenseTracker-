import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { addThousandSeparator } from "../../utils/helper"
import InfoCard from "../../components/cards/infoCard"
import RecentTransactions from "../../components/dasboard/RecentTransaction"
import FinanceOverview from "../../components/dasboard/FinanceOverview"
import ExpenseTransaction from "../../components/dasboard/ExpenseTransaction"
import Last30DaysExpenses from "../../components/dasboard/Last30DaysExpenses"
import RecentIncomeWithChart from "../../components/dasboard/RecentIncomeWithChart"

import {IoMdCard} from 'react-icons/io'
import {LuHandCoins, LuWalletMinimal} from 'react-icons/lu'
import RecentIncome from "../../components/dasboard/RecentIncome"


const Dashboard = () => {
  useUserAuth()
  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (loading) return
  
      setLoading(true)
  
      try {
        const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
  
        if (response.data){
          setDashboardData(response.data)
        }
      } catch (error) {
        console.error('Something went wrong. Please try again', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

            <ExpenseTransaction 
              transactions={dashboardData?.last30DaysExpense?.transactions || []}
              onSeeMore={() => navigate('/expense')}
            />

            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpense.transactions || []}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
              totalIncome = {dashboardData?.totalIncome || 0}
            />

            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate('/income')}
            />

        </div>
      </div>
    </DashboardLayout>
  )
}
export default Dashboard