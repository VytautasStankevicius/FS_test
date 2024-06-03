import Login from "../login/Login";
import Header from "../header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../register/Register";
import Dashboard from "../dashboard/Dashboard";
import AdminPage from "../adminPage/AdminPage";
import ExpenseUpdate from "../expenseUpdate/ExpenseUpdate";
import ProtectedRoutes from "../protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/expenseUpdate/:id" element={<ExpenseUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
