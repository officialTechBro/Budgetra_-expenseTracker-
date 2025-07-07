import moment from "moment"

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) return  ""

    const words = name.split(" ")
    let initials = ""

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]
    }
    
    return initials.toUpperCase()
  
}

export const addThousandSeparator = (num) => {
    if (num === null || isNaN(Number(num))) return "";
  
    const [int, frac] = num.toString().split(".");
    const formattedInteger = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return frac ? `${formattedInteger}.${frac}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        // source: item?.amount,
        amount: Number(item?.amount)
    }))

    return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MM'),
        amount: item?.amount,
        source: item?.source,
    }))

    return chartData
}