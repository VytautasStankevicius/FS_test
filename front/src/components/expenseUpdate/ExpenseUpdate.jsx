import React from 'react'
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import * as expenses from "../../services/expenses";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as expenseCategories from "../../services/expenseCategory";


const ExpenseUpdate = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [newExpense, setNewExpense] = useState({amount:"", kind:"", expense_category:"", time:""})

  useEffect(() => {
    getExpense();
    getExpenseCategories();
  }, []);


  const getExpense = async () => {
    
    try {
      const res = await expenses.getExpense(token, id);
      setNewExpense(res.data);
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  const getExpenseCategories = async () => {
    try {
      const res = await expenseCategories.getExpensesCategory(token);
      console.log(res);
      setExpenseCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await expenses.updateExpenses(token, id, newExpense);
      console.log(data)
      //navigate()
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
       <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" placeholder="Enter amount"   
              value={newExpense.amount}
              name="amount"
              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example"   
              value={newExpense.expense_category}
              name="expense_category"
              onChange={handleChange}>
              {expenseCategory.map((category) => {
                return <option value={category._id} key={category._id}>{category.title}</option>;
              })}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Kind</Form.Label>
            <Form.Select aria-label="Default select example"  
              value={newExpense.kind}
              name="kind"
              onChange={handleChange}>
              <option value="income" title="">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Time</Form.Label>
              <Form.Control type="date" placeholder="Enter expense"  
              value={newExpense.time}
              name="time"
              onChange={handleChange}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
    </div>
  )
}

export default ExpenseUpdate
