'use client'
import dynamic from "next/dynamic"
import styles from './login.module.css'
import { useRouter } from 'next/navigation'
import { useState } from "react"



function Login() {
    const router = useRouter()
    const [displayMessage, setDisplayMessage] = useState('')
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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:3020/api/login', { email, password });
            if (response.status === 200) {

                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userName', response.data.username);
                localStorage.setItem('userId', response.data._id);

            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
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
