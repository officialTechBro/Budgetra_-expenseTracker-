import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
 } from "recharts"

const CustomBarChart = ({data}) => {

    // Alternate Color
    const getBarColor =(index) => {
        return index % 2 === 0 ? "#6C5DD3" : "#A084E8";
    }

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }

        return null
    }

  return (
    <div className="bg-white mt-6">
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid stroke="none" />

                <XAxis dataKey="amount" tick={{fontSize: 12, fill: '#555'}} stroke="none" />
                <YAxis tick={{fontSize: 12, fill: '#555'}} stroke="none" />

                <Tooltip content={<CustomTooltip />} />

                <Bar
                    dataKey="amount"
                    fill="#FF8042"
                    radius={[10, 10, 0, 0]}
                    activeDot={{ r: 8, fill: "yellow" }}
                    activeStyle={{ fill: "green"}}
                >
                    {Array.isArray(data) &&
                        data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
export default CustomBarChart