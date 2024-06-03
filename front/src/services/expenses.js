// tie duomenys, kuriuos paduodu dashboard(token)
export const getAllExpenses = async (token) => {
  try {
    const res = await fetch("http://localhost:8882/api/v1/expenses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const createExpenses = async (token, data) => {
  try {
    const res = await fetch("http://localhost:8882/api/v1/expenses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteExpenses = async (id, token) => {
  try {
    const res = await fetch(`http://localhost:8882/api/v1/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const updateExpenses = async (token, id, data) => {
  try {
    const res = await fetch(`http://localhost:8882/api/v1/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const getExpense = async (token, id) => {
  try {
    const res = await fetch(`http://localhost:8882/api/v1/expenses/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};