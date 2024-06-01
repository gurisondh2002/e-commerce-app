'use client'
import dynamic from "next/dynamic"
import styles from './login.module.css'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import axios from 'axios'

function Login() {
    const router = useRouter()
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleEmailChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, email: e.target.value }
        })
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, password: e.target.value }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userDataa = {
                email: data.email,
                password: data.password
            }
            const response = await axios.post('https://e-comm-backend-fi70.onrender.com/api/login', userDataa);
            console.log("res", response.data)
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('userId', response.data._id);
            localStorage.setItem('isAdmin', response.data.isAdmin);
            console.log(localStorage.getItem('email'))
            console.log(localStorage.getItem('isAdmin'))
            router.push("/auth")
        }
        catch (error) {
            console.error('Login failed:', error);
        }
    }
    return (
        <div className={`${styles.containerMain}`} style={{ backgroundImage: `url('/assets/register.jpg')` }}>
            <br />
            <br />
            <div className={`${styles.loginContainer}`}>
                <h2>Login</h2>
                <form className={`${styles.loginInput}`}>
                    <label for='email'>Email:</label>
                    <input value={data.email} id='email' type='email' placeholder='Enter email...' onChange={handleEmailChange} />
                    <br />
                    <label for='password'>Password:</label>
                    <input value={data.password} id='password' type='password' placeholder='Enter password...' onChange={handlePasswordChange} />
                    <br />
                    <button onClick={handleSubmit}>Login</button>
                    <br />
                    <p>Don't have an account? <a href="/registration" style={{ color: "black" }}>Register Here</a></p>
                </form>
            </div>
        </div>


    )
}

export default Login