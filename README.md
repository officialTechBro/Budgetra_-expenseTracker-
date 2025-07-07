💰 Budgetra
A modern, full-stack personal finance management dashboard to help you track, visualize, and manage your expenses and incomes with ease.

🚀 Overview
Budgetra is a personal finance web application designed to help you monitor your expenses and incomes in one place. It offers intuitive visual insights, detailed lists, and the ability to download reports, empowering you to take full control of your financial health.

✨ Features
✅ User authentication with JWT
✅ Add, edit, and delete expenses and incomes
✅ Visualize categories and trends with bar charts
✅ Overview cards summarizing financial activities
✅ Downloadable financial reports (Excel)
✅ Toast notifications for actions and errors
✅ Fully responsive, modern UI (Tailwind CSS)
✅ Clean and modular code structure

🛠 Tech Stack

🌐 Frontend
React — component-based UI
Tailwind CSS — utility-first styling
Recharts — for interactive data visualizations
Axios — HTTP client for API requests
React Hot Toast — notifications
React Hooks — state management and side effects


💾 Backend
Node.js — JavaScript runtime environment
Express.js — backend framework for building REST APIs
MongoDB — NoSQL database for storing transactions
Mongoose — object modeling and schema validation
JWT (JSON Web Tokens) — authentication and route protection


💡 Usage
✅ Log in using your credentials (protected routes)
✅ Navigate to Income or Expense sections from the dashboard
✅ Add new entries using the modal form
✅ View lists of all entries and delete if needed
✅ Visualize your data using overview charts
✅ Download detailed reports for bookkeeping


🌐 API Structure
Expense
GET /expense — get all expenses
POST /expense — add new expense
DELETE /expense/:id — delete an expense
GET /expense/report — download expense report

Income
GET /income — get all incomes
POST /income — add new income
DELETE /income/:id — delete an income
GET /income/report — download income report

📌 All endpoints are defined in src/utils/apiPaths.js.

🤝 Contributing
Contributions are welcome! 🚀

1️⃣ Fork the repository
2️⃣ Create your feature branch (git checkout -b feature/amazing-feature)
3️⃣ Commit your changes (git commit -m 'Add amazing feature')
4️⃣ Push to your branch (git push origin feature/amazing-feature)
5️⃣ Open a pull request


💬 Contact
For feedback, questions, or collaborations:

Twitter: @tylive007
Email: taiwooladosu1@gmail.com
