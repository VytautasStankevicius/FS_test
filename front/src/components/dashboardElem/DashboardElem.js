import React from 'react'
import Dashboard from '../dashboard/Dashboard'
import { useSelector } from "react-redux";
import * as  expenseService from "../../services/expenses"
import { Link } from 'react-router-dom';

function DashboardElem({exp,getExpenses}) {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const handleDelete = async () => {
    await expenseService.deleteExpenses(exp._id, token);
    await getExpenses()
  };

  return (
  
    <div className="card d-inline-flex " style={{"width": "18rem"}}>
    <div className="card-body">
      <h5 className="card-title">{exp.kind}</h5>
      <p className="card-text">{exp.amount}</p>
      <p className="card-text">{exp.time}</p>
      <Link to={`/expenseUpdate/${exp._id}`}>Atnaujinti duomenis</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  </div>
  )
}

export default DashboardElem
