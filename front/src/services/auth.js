
export const login = async (loginData) => {
  console.log(loginData)
    try {
      const res = await fetch('http://localhost:8882/api/v1/auth/login', {  
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data =  await res.json();
      console.log(data)
      return data
    } catch (err) {
      console.log(err.message);
    }
  };

  export const register = async (RegisterData) => {
    try {
      const res = await fetch('http://localhost:8882/api/v1/auth/signup', {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(RegisterData),
      });
      return await res.json();
    } catch (err) {
      console.log(err.message);
    }
  };



 