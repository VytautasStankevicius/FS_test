import React from 'react';
import * as authService from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: ' ',
        email: '',
        password:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const data = await authService.register(form)
            navigate('/')

        }catch(err){
            console.log(err)
        }
    }

  return  (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label for="exampleInputname1" className="form-label">Vartotojo vardas</label>
                        <input type="username" name="username" onChange={handleChange} value={form.username} className="form-control" id="exampleInputname1" aria-describedby="nameHelp" />
                        
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" onChange={handleChange} value={form.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" onChange={handleChange} value={form.password} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit"  className="btn btn-primary">Submit</button>
                    <Link to="/">
                    <button className="btn btn-primary">Jei turi paskyra gali prisijungti</button></Link>
                </form>
            </div>
        </>
    )
}

export default Register
