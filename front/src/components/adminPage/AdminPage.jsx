import * as expenses from "../../services/expenseCategory";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryElmUpdate from "../categoryElmUpdate/CategoryElmUpdate";

function AdminPage() {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const [data, setData] = useState([]);

  const [category, setCategory] = useState({
    title: "",
  });

  const getCategories = async () => {
    try {
      const res = await expenses.getExpensesCategory(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    await expenses.deleteExpensesCategory(id, token);
    await getCategories();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await expenses.createExpensesCategory(token, category);
      await getCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Kategorijos pavadinimas</legend>
          <div className="mb-3">
            <input
              type="text"
              id="disabledTextInput"
              className="form-control"
              placeholder="Ivesti pavadinima"
              value={category.title}
              name="title"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Uzpildyti
          </button>
        </fieldset>
      </form>
      {data.map((categoryName) => {
        return (
          <div key={categoryName._id} className="d-flex mb-2">
            <span>{categoryName.title}</span>

            {<CategoryElmUpdate cat={categoryName} />}
            <button onClick={() => handleDelete(categoryName._id)}>
              Istrinti
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AdminPage;
