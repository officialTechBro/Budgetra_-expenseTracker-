import { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const RecentIncomeWithChart = ({ data = [], totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  }, [data]);

  const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;
