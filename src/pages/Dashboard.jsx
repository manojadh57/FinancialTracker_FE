import React, { useEffect, useState } from "react";
import { fetchTransaction } from "../helpers/axiosHelper";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const getTransactions = async () => {
      const { status, transactions } = await fetchTransaction();

      if (status === "success") {
        setTransactions(transactions);

        const incomeTotal = transactions
          .filter((t) => t.type === "income")
          .reduce((acc, curr) => acc + +curr.amount, 0);

        const expenseTotal = transactions
          .filter((t) => t.type === "expense")
          .reduce((acc, curr) => acc + +curr.amount, 0);

        setIncome(incomeTotal);
        setExpense(expenseTotal);
      }
    };

    getTransactions();
  }, []);

  const balance = income - expense;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📊 Dashboard</h2>

      <div className="row mb-4 text-center">
        <div className="col-md-4 mb-3">
          <div className="p-3 bg-success text-white rounded fw-bold">
            💰 Income: Rs. {income}
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="p-3 bg-danger text-white rounded fw-bold">
            💸 Expense: Rs. {expense}
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="p-3 bg-primary text-white rounded fw-bold">
            ⚖️ Balance: Rs. {balance}
          </div>
        </div>
      </div>

      <h4 className="mb-3">📝 Recent Transactions</h4>
      <ul className="list-group">
        {[...transactions]
          .reverse()
          .slice(0, 5)
          .map((tx, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                <strong>{tx.title}</strong> ({tx.type})
              </span>
              <span>
                Rs. {tx.amount} on {tx.tDate?.slice(0, 10)}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;
