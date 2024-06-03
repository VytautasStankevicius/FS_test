import { useState } from "react";
import { useSelector } from "react-redux";
import * as expenses from "../../services/expenseCategory";
import { Link, useNavigate } from "react-router-dom";

function CategoryElmUpdate({ cat }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const id = cat._id;
  const [title, setTitle] = useState(cat.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token, id, title);
      const data = await expenses.updateExpensesCategory(token, id, title);
    } catch (err) {
      console.log(err);
    }
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
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Pakeisti
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CategoryElmUpdate;
