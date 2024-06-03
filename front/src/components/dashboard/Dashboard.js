import { useEffect, useState } from "react";
import * as expenses from "../../services/expenses";
import { useSelector } from "react-redux";
import DashboardElem from "../dashboardElem/DashboardElem";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import * as expenseCategories from "../../services/expenseCategory";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const [data, setData] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [newExpense, setNewExpense] = useState({amount:"", kind:"", expense_category:"", time:""})

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
      const data = await expenses.createExpenses(token, newExpense);
      await getExpenses();
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

  const getExpenses = async () => {
    try {
      const res = await expenses.getAllExpenses(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getExpenses();
    getExpenseCategories();
  }, []);

  return (
    <div>
      {data.map((expense) => {
        return <DashboardElem key={expense._id} exp={expense} getExpenses={getExpenses} />;
      })}
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </div>
  );
}
