export const getExpensesCategory = async (token) => {
  try {
    const res = await fetch("http://localhost:8882/api/v1/category", {
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

export const createExpensesCategory = async (token, data) => {
  try {
    const res = await fetch("http://localhost:8882/api/v1/category", {
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

export const updateExpensesCategory = async (token, id, data) => {
  try {
    const res = await fetch(`http://localhost:8882/api/v1/category/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: data }),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteExpensesCategory = async (id, token) => {
  try {
    const res = await fetch(`http://localhost:8882/api/v1/category/${id}`, {
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
