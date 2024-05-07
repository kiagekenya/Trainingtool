import React, { useState}  from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
const [userData, setUserData] = useState({
    name: "",
    email:"",
    password:"",
    password2: ""
})

const changeInputHandler = (e) => {
setUserData(prevState => {
    return{...prevState ,[e.target.name]: e.target.value}
})
}


  return (
    <section className="register">
        <div className="containerrr">
            <h2>Sign Up</h2>
            <form action="" className="form-register_form">
              
                <input type="text" placeholder='Full Name'  name='name' id='name'value={userData.name} onChange={changeInputHandler} autoFocus />
                <input type="text" placeholder='Email'  name='email' id='email'value={userData.email} onChange={changeInputHandler}  />
                <input type="password" placeholder='Password'  name='password' id='password'value={userData.password} onChange={changeInputHandler}  />
                <input type="password" placeholder='Confirm Password'  name='password2' id='password2'value={userData.password2} onChange={changeInputHandler} />
                <button type="submit"  className='btnprimary'> Register</button>
            </form>
            <small>Already have an account? <Link to= "/">Login here.</Link></small>
        </div>
    </section>
  )
}

export default Register