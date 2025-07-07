import { useState } from "react"
import FormInput from "../Inputs/FormInput"
import EmojiPickerPopup from "../Inputs/EmojiPickerPopup"

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "", 
        icon: "",
    })

    const handleChange = (key, value) => setExpense({...expense, [key]: value})

  return (
    <div>
        <EmojiPickerPopup 
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <FormInput 
            value={expense.category}
            onChange={({target}) => handleChange("category", target.value)}
            label="Expense"
            placeholder="Rent, Groceries etc"
            type="text"
        /> 

        <FormInput 
            value={expense.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Amount"
            placeholder=""
            type="number"
        />

        <FormInput 
            value={expense.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
        />

        <div className="flex justify-end mt-6">
            <button
                type="button"
                className="add-btn add-btn-fill"
                onClick={() => onAddExpense(expense)}
            >
                Add Expense
            </button>
        </div>
    </div>
  )
}
export default AddExpenseForm