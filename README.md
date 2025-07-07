# 💰 Budgetra - Expense & Income Tracker Dashboard

A modern web-based application for tracking expenses and incomes. Easily monitor financial activities, visualize summaries, and manage entries with an intuitive interface.

---

## 🚀 **Overview**

This project provides a personal finance dashboard to help users track their expenses and incomes in one place. It supports adding, viewing, and deleting entries, visualizing overviews with charts, and downloading reports.

---

## ✨ **Features**

- ✅ User authentication & protected routes
- ✅ Add, edit, and delete expenses and incomes
- ✅ Category/source-based bar charts (Recharts)
- ✅ Overview cards summarizing financial activity
- ✅ Downloadable financial reports (Excel)
- ✅ Toast notifications for actions and errors
- ✅ Responsive and clean UI using Tailwind CSS
- ✅ Modular component architecture

---

## 🛠 **Tech Stack**

🌐 Frontend
React — component-based UI

Tailwind CSS — utility-first styling

Recharts — interactive data visualizations

Axios — HTTP client for API calls

React Hot Toast — elegant notifications

React Hooks — local state and side effects

💾 Backend
Node.js — JavaScript runtime

Express.js — backend framework for REST APIs

MongoDB — NoSQL database

Mongoose — MongoDB object modeling and schema validation

JWT (JSON Web Tokens) — authentication and route protection

---


---

## ⚙️ **Setup & Installation**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/your-username/expense-income-tracker.git
cd expense-income-tracker

2️⃣ Install dependencies

bash
Copy
Edit
npm install
3️⃣ Configure environment variables

Create a .env file and add your API base URL and any other configs:

env
Copy
Edit
REACT_APP_API_BASE_URL=https://your-api-url.com/api
4️⃣ Start the development server

bash
Copy
Edit
npm start
The app will run at http://localhost:3000.


Usage
Login using your credentials (authentication integrated via useUserAuth)

Navigate to Income or Expense pages from the sidebar

Add new entries via modal forms

View detailed lists with delete options

Visualize trends and categories in charts

Download reports for bookkeeping

🌐 API Structure
Expense
GET /expense — fetch all expenses

POST /expense — add new expense

DELETE /expense/:id — delete expense

GET /expense/report — download expense report

Income
GET /income — fetch all incomes

POST /income — add new income

DELETE /income/:id — delete income

GET /income/report — download income report

📌 API paths are configured in src/utils/apiPaths.js.

🤝 Contributing
Contributions are welcome!

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a pull request

🪪 License
This project is licensed under the MIT License. See LICENSE for details.

💬 Contact
For questions, feedback, or collaboration inquiries, feel free to reach out:

Twitter: @yourhandle

Email: yourname@example.com

🎉 Happy tracking, and take control of your finances!
