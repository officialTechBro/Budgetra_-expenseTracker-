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
        amount: item?.amount
    }))

    return chartData
}